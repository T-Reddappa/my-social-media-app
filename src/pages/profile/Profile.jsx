import React, { useContext, useEffect } from "react";
import "./profile.css";
import { AuthContext } from "../../contexts/AuthContext";
import { UsersContext } from "../../contexts/UserContext";
import { PostContext } from "../../contexts/PostContext";
import { useParams } from "react-router-dom";
import PostCard from "../../components/postCard/PostCard";

const Profile = () => {
  const { token, currentUser } = useContext(AuthContext);
  const { username } = useParams();
  const {
    getAllUsers,
    userState,
    getUserByUsername,
    followUser,
    unfollowUser,
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
          <button>Edit Profile</button>
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
        <div className="user-social-status">
          <div>
            <p>{userProfile?.following?.length}</p>
            <p>Following</p>
          </div>
          <div>
            <p>{userPosts?.length}</p>
            <p>Posts</p>
          </div>
          <div>
            <p>{userProfile?.followers?.length}</p>
            <p>Followers</p>
          </div>
        </div>
      </div>
      <h3>Your Posts </h3>
      {userPosts?.map((post) => (
        <PostCard post={post} />
      ))}
    </div>
  );
};

export default Profile;
