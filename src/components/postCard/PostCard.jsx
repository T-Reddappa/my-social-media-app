import React, {
  useContext,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import { PostContext } from "../../contexts/PostContext";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

import "./postCard.css";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../../contexts/UserContext";
import { AuthContext } from "../../contexts/AuthContext";
import postedDate from "../../utils/postedDate";
import PostEditModal from "../postEditModal/PostEditModal";
import { avatarImages } from "../../utils/avatars";

const PostCard = ({ post }) => {
  const { currentUser } = useContext(AuthContext);
  const [showPostActions, setShowPostActions] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);

  const {
    userState: { users, bookmarks },
    userDispatch,
    getAllBookmarkPosts,
    bookmarkPost,
    removePostFromBookmarks,
    followUser,
    unfollowUser,
  } = useContext(UsersContext);

  const { likePost, postState, dislikePost, isLikedByCurrentUser, deletePost } =
    useContext(PostContext);

  const profileToDisplay = users.find(
    (user) => user.username === post.username
  );
  const navigate = useNavigate();

  const isLiked = isLikedByCurrentUser(post, currentUser);
  const isFollowing = profileToDisplay?.followers.some(
    (user) => user.username === currentUser.username
  );

  const isBookmarked = bookmarks.some(
    (bookmarkedPost) => bookmarkedPost._id === post._id
  );

  const date = postedDate(post.createdAt);
  useEffect(() => {
    console.log(postedDate(post.createdAt));
    console.log(isFollowing);
  });

  return (
    <>
      <div className="post-container">
        <div className="post-card">
          <div className="user-info">
            <div
              className="post-card-profile-wrapper"
              onClick={() => navigate(`/profile/${post.username}`)}
            >
              <img
                className="post-card-profile-picture"
                src={
                  profileToDisplay?.profilePicture
                    ? profileToDisplay.profilePicture
                    : avatarImages[4]
                }
                alt="Profile"
                onClick={() => console.log(isLiked)}
              />
              <div>
                <b>
                  {profileToDisplay.firstName} {profileToDisplay.lastName}
                </b>
                <p>@{profileToDisplay.username}</p>
              </div>
              <FiberManualRecordIcon
                style={{
                  color: "lightgray",
                  fontSize: "10px",
                  marginTop: "8px",
                }}
              />

              <p className="posted-time">{date}</p>
            </div>

            <div>
              <MoreVertOutlinedIcon
                style={{ cursor: "pointer" }}
                onClick={() => setShowPostActions(!showPostActions)}
              />
            </div>
          </div>
          {/* <div className="post-action-btns"> */}
          {showPostActions && (
            <div className="post-action-btns">
              {post.username === currentUser.username ? (
                <div className="post-actions">
                  <button
                    className="post-action-btn"
                    onClick={() => deletePost(post._id)}
                  >
                    <DeleteOutlineOutlinedIcon style={{ fontSize: "14px" }} />
                    Delete
                  </button>

                  <button
                    className="post-action-btn"
                    onClick={() => setShowPostModal(true)}
                  >
                    <EditNoteOutlinedIcon style={{ fontSize: "14px" }} />
                    Edit
                  </button>
                </div>
              ) : (
                <button
                  className="post-action-btn"
                  onClick={() =>
                    !isFollowing
                      ? followUser(profileToDisplay._id)
                      : unfollowUser(profileToDisplay._id)
                  }
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
          )}
          {/* </div> */}
          <div className="post-content">
            <p>{post.content}</p>
          </div>

          {/* <hr /> */}
          <div className="post-social-response">
            <div
              className="post-socials post-likes"
              onClick={() => {
                isLiked ? dislikePost(post._id) : likePost(post._id);
                console.log(isLiked);
              }}
            >
              {isLiked ? (
                <FavoriteIcon style={{ color: "red" }} />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}

              <span style={{ fontSize: "18px" }}>{post.likes?.likeCount}</span>
            </div>
            <div className="post-socials">
              <ChatBubbleOutlineOutlinedIcon />
              <p>{post.comments?.length}</p>
            </div>
            {/* <div className="post-socials">
              <ShareOutlinedIcon />
            </div> */}
            <div
              className="post-socials"
              onClick={() =>
                isBookmarked
                  ? removePostFromBookmarks(post._id)
                  : bookmarkPost(post._id)
              }
              // onClick={() =>
              //   userDispatch({ type: "ADD_TO_BOOKMARKS", payload: post })
              // }
            >
              {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderOutlinedIcon />}
            </div>
          </div>
        </div>
        {showPostModal && (
          <PostEditModal
            post={post}
            setShowPostModal={setShowPostModal}
            userPosted={profileToDisplay}
            setShowPostActions={setShowPostActions}
          />
        )}
      </div>
    </>
  );
};

export default PostCard;
