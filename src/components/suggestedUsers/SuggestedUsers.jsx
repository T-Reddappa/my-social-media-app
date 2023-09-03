import React, { useContext, useEffect } from "react";
import { UsersContext } from "../../contexts/UserContext";
import { AuthContext } from "../../contexts/AuthContext";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

import "./suggestedUsers.css";
import { useNavigate } from "react-router-dom";

const SuggestedUsers = () => {
  const {
    userState: { users },
    followUser,
    unfollowUser,
  } = useContext(UsersContext);
  const { currentUser } = useContext(AuthContext);

  const usersToSuggest = users.filter(
    (user) => user.username !== currentUser?.username
  );

  const [loggedUser] = users.filter(
    (user) => user.username === currentUser?.username
  );
  const navigate = useNavigate();

  return (
    <div className="suggest-container">
      Who to Follow?
      <hr />
      <div className="suggest-wrapper">
        {usersToSuggest?.map((user) => {
          return (
            <div className="suggest-user-card" key={user._id}>
              <div className="suggested-user-info">
                <img
                  src={user.profilePicture}
                  alt={user.username}
                  className="suggest-user-profile-picture"
                  onClick={() => navigate(`/profile/${user.username}`)}
                />
                <div>
                  <p>
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p>@{user?.username}</p>
                </div>
              </div>
              {!user.followers.some(
                (user) => user.username === loggedUser.username
              ) ? (
                <button
                  onClick={() => followUser(user._id)}
                  className="follow-btn"
                >
                  Follow <AddOutlinedIcon style={{ fontSize: "14px" }} />
                </button>
              ) : (
                <button
                  onClick={() => unfollowUser(user._id)}
                  className="follow-btn"
                >
                  Unfollow <RemoveOutlinedIcon style={{ fontSize: "14px" }} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SuggestedUsers;
