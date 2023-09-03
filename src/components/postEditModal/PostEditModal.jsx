import React, { useContext, useEffect, useState } from "react";
import "./postEditModal.css";
import { PostContext } from "../../contexts/PostContext";
import EmojiPicker from "emoji-picker-react";
import {
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
  Cancel,
} from "@mui/icons-material";

const PostEditModal = ({
  post,
  setShowPostModal,
  userPosted,
  setShowPostActions,
}) => {
  const [editContent, setEditContent] = useState(post);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { editPost } = useContext(PostContext);

  const handleSubmit = () => {
    editPost(post._id, { content: editContent.content });
    setShowPostModal(false);
    setShowPostActions(false);
  };

  return (
    <div className="post-modal-container">
      <div className="post-modal-details">
        <img
          className="post-modal-profile"
          src={userPosted?.profilePicture}
          alt={userPosted?.firstName}
        />

        <textarea
          className="post-modal-content"
          name="content"
          id="content"
          value={editContent.content}
          onChange={(e) => {
            setEditContent({ ...editContent, content: e.target.value });
          }}
        ></textarea>
        <EmojiEmotions
          htmlColor="goldenrod"
          className="shareIcon"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        />
      </div>
      <div>
        {showEmojiPicker && (
          <div className="styled-emoji-picker">
            <EmojiPicker
              onEmojiClick={(e) =>
                setEditContent((prev) => ({
                  ...prev,
                  content: prev.content ? prev.content + e.emoji : e.emoji,
                }))
              }
            />
          </div>
        )}
      </div>
      <div>
        <button
          onClick={() => setShowPostModal(false)}
          className="post-modal-btn"
        >
          Close
        </button>
        <button onClick={handleSubmit} className="post-modal-btn">
          Save
        </button>
      </div>
    </div>
  );
};

export default PostEditModal;
