import React, { useContext, useDeferredValue, useEffect } from "react";
import { PostContext } from "../../contexts/PostContext";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import "./postCard.css";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../../contexts/UserContext";
import { AuthContext } from "../../contexts/AuthContext";
import postedDate from "../../utils/postedDate";

const PostCard = ({ post }) => {
  const { currentUser } = useContext(AuthContext);

  const {
    userState: { users, bookmarks },
    userDispatch,
    getAllBookmarkPosts,
    bookmarkPost,
    removePostFromBookmarks,
  } = useContext(UsersContext);

  const { likePost, postState, dislikePost, isLikedByCurrentUser, deletePost } =
    useContext(PostContext);

  const profileToDisplay = users.find(
    (user) => user.username === post.username
  );
  const navigate = useNavigate();

  const isLiked = isLikedByCurrentUser(post, currentUser);

  const isBookmarked = bookmarks.some(
    (bookmarkedPost) => bookmarkedPost._id === post._id
  );

  const date = postedDate(post.createdAt);
  useEffect(() => {
    console.log(postedDate(post.createdAt));
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
                src={profileToDisplay?.profilePicture}
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

              <p>{date}</p>
            </div>

            <div>
              <MoreVertOutlinedIcon
                style={{ cursor: "pointer" }}
                onClick={() => deletePost(post._id)}
              />
            </div>
          </div>
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
      </div>
    </>
  );
};

export default PostCard;
