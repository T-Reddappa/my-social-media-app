import {
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
  Cancel,
} from "@mui/icons-material";
import EmojiPicker from "emoji-picker-react";

import "./share.css";
import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { PostContext } from "../../contexts/PostContext";
import { avatarImages } from "../../utils/avatars";

const Share = () => {
  const { currentUser } = useContext(AuthContext);
  const { createPost } = useContext(PostContext);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const user = currentUser;

  const [file, setFile] = useState(null);
  const desc = useRef();

  const pic =
    "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/22605718/2023/4/1/840e1a00-9f11-4dde-93e9-380aa0c0ddf71680333058463HERENOWMenWhiteWovenDesignPUSneakers1.jpg";

  const handleSubmit = async (e) => {
    e.preventDefault();

    createPost({ content: content?.content, media: pic });
    setContent({ content: "" });
    setShowEmojiPicker(false);
  };

  const handleChange = (value) => {
    setContent((prev) => ({ ...prev, content: value }));
    console.log(content.content);
  };

  return (
    <div className="shareContainer">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={user?.profilePicture ? user.profilePicture : avatarImages[4]}
            alt=""
            className="shareProfileImg"
          />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            value={content.content}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={handleSubmit}>
          <div className="shareOptions">
            {/* <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label> */}

            <div
              className="shareOption"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button
            className="shareButton"
            type="submit"
            disabled={!content?.content?.trim()}
          >
            Share
          </button>
        </form>
      </div>
      {showEmojiPicker && (
        <EmojiPicker
          onEmojiClick={(e) =>
            setContent((prev) => ({
              ...prev,
              content: prev.content ? prev.content + e.emoji : e.emoji,
            }))
          }
        />
      )}
    </div>
  );
};

export default Share;
