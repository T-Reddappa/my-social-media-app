import React, { useContext, useEffect, useState } from "react";
import "./profileEditModal.css";
import { UsersContext } from "../../contexts/UserContext";
import { AuthContext } from "../../contexts/AuthContext";
import { avatarImages } from "../../utils/avatars";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const ProfileEditModal = () => {
  const {
    getAllUsers,
    userState,
    editUserProfile,

    setShowProfileEditModal,
  } = useContext(UsersContext);
  const { currentUser } = useContext(AuthContext);
  const [editInputs, setEditInputs] = useState(currentUser);

  const [showAvatars, setShowAvatars] = useState(false);
  // const user = userState.users?.find(
  //   (user) => user.username === currentUser.username
  // );

  return (
    <div className="profile-edit-modal">
      <h3>Edit Profile</h3>
      <div
        className="pictures-container"
        style={{
          position: "relative",
          width: "4rem",
          height: "4rem",
        }}
      >
        <img
          onClick={() => setShowAvatars(true)}
          className="picture"
          src={
            editInputs?.profilePicture
              ? editInputs.profilePicture
              : avatarImages[4]
          }
          alt="heroine"
          suppressContentEditableWarning
        />

        <AccountCircleRoundedIcon
          onClick={() => setShowAvatars(true)}
          style={{
            color: "lightgray",
            position: "absolute",
            left: "50%",
            top: "50%",
            fontSize: "30px",
            transform: "translate(-50%, -50%)",
            zIndex: "1",
            cursor: "pointer",
          }}
        />
      </div>
      <hr />

      {showAvatars && (
        <div className="avatars-container">
          <div className="avatars-container-top">
            <CloseOutlinedIcon
              onClick={() => setShowAvatars(false)}
              style={{
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            />
            <span>Choose your Avatar</span>
          </div>
          {avatarImages?.map((avatar) => {
            return (
              <img
                onClick={() => {
                  setEditInputs({
                    ...editInputs,
                    profilePicture: avatar,
                  });
                  setShowAvatars(false);
                }}
                className="picture"
                src={avatar}
                alt="heroine"
              />
            );
          })}{" "}
        </div>
      )}

      <div className="profile-info-edits">
        <div>
          <label>Bio</label>
          <textarea
            className="bio-input"
            type="text"
            value={editInputs.description}
            onChange={(e) =>
              setEditInputs({ ...editInputs, description: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="website">Website</label>
          <input
            type="text "
            name="website"
            className="website-input"
            value={editInputs.website}
            onChange={(e) =>
              setEditInputs({ ...editInputs, website: e.target.value })
            }
          />
        </div>
      </div>

      <div className="profile-edit-btns">
        <button onClick={() => setShowProfileEditModal(false)}>Close</button>
        <button onClick={() => editUserProfile(editInputs)}>Save</button>
      </div>
    </div>
  );
};

export default ProfileEditModal;
