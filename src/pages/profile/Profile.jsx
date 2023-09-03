import React, { useContext, useEffect, useState } from "react";
import "./profile.css";
import { AuthContext } from "../../contexts/AuthContext";
import { UsersContext } from "../../contexts/UserContext";
import { PostContext } from "../../contexts/PostContext";
import { useParams } from "react-router-dom";
import PostCard from "../../components/postCard/PostCard";
import ProfileEditModal from "../../components/profileEditModal/ProfileEditModal";
import LinkIcon from "@mui/icons-material/Link";

const Profile = () => {
  const { token, currentUser } = useContext(AuthContext);
  const { username } = useParams();
  const {
    getAllUsers,
    userState,
    getUserByUsername,
    followUser,
    unfollowUser,
    showProfileEditModal,

    setShowProfileEditModal,
  } = useContext(UsersContext);

  const userProfile = userState.users.find(
    (user) => user.username === username
  );

  const isLoggedInUser = currentUser.username === username;

  const {
    postState: { allPosts },
  } = useContext(PostContext);

  const userPosts = allPosts?.filter((post) => post.username === username);

  useEffect(() => {
    getUserByUsername(username);
    console.log(userState.users);
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="profile-page-container page-container">
      <div className="profile-page-info">
        <img
          className="profile-page-picture"
          src={userProfile?.profilePicture}
          alt=""
          onClick={() => {
            console.log(
              userProfile?.followers?.some(
                (user) => user.username === currentUser.username
              )
            );
          }}
        />
        <p>{userProfile?.firstName + userProfile?.lastName}</p>
        <p>@{userProfile?.username}</p>

        {isLoggedInUser ? (
          <button
            className="profile-edit-btn"
            onClick={() => setShowProfileEditModal(true)}
          >
            Edit Profile
          </button>
        ) : (
          <button
            className="profile-edit-btn"
            onClick={() => {
              userProfile?.followers?.some(
                (user) => user.username === currentUser.username
              )
                ? unfollowUser(userProfile._id)
                : followUser(userProfile._id);
            }}
          >
            {userProfile?.followers?.some(
              (user) => user.username === currentUser.username
            )
              ? "Unfollow"
              : "Follow"}
          </button>
        )}
        <div className="profile-description">{userProfile?.description}</div>
        <div className="user-website-link">
          <LinkIcon />
          <a target="_blank" href={userProfile?.website}>
            {userProfile?.website?.split("/")[2]}
          </a>
        </div>
        <div className="user-social-status">
          {/* <div className="user-socials"> */}
          <div>
            <b>{userProfile?.following?.length}</b>
            <p>Following</p>
          </div>
          <div>
            <b>{userPosts?.length}</b>
            <p>Posts</p>
          </div>
          <div>
            <b>{userProfile?.followers?.length}</b>
            <p>Followers</p>
          </div>
        </div>
        {showProfileEditModal && <ProfileEditModal />}
      </div>
      <h3>Your Posts </h3>
      {userPosts?.map((post) => (
        <PostCard post={post} />
      ))}
    </div>
  );
};

export default Profile;
