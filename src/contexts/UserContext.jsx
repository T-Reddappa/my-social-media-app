import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const { token } = useContext(AuthContext);

  const initialUserState = {
    users: [],
    bookmarks: [],
    user: {},
  };

  const userReducer = (state, action) => {
    switch (action.type) {
      case "GET_ALL_USERS":
        return { ...state, users: action.payload };
      case "ADD_USER":
        return { ...state, users: [...state.users, action.payload] };
      case "ADD_TO_BOOKMARKS":
        return { ...state, bookmarks: action.payload };
      case "FOLLOW_USER":
        return {
          ...state,
          users: state.users.map((user) => {
            const updatedUser = action.payload.find(
              ({ _id }) => _id === user._id
            );
            return updatedUser ? updatedUser : user;
          }),
        };
    }
  };

  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  const getAllUsers = async () => {
    const res = await axios.get("/api/users");

    const {
      status,
      data: { users },
    } = res;
    if (status === 200) {
      userDispatch({ type: "GET_ALL_USERS", payload: users });
    }

    try {
    } catch (e) {
      console.log(e);
    }
  };

  const getUserByUsername = async (username) => {
    console.log(username);
    try {
      const res = await axios.get(`/api/users/${username}`);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllBookmarkPosts = async () => {
    try {
      const res = await axios.get("/api/users/bookmark", {
        headers: {
          authorization: token,
        },
      });
      const {
        status,
        data: { bookmarks },
      } = res;
      if (status === 200) {
        userDispatch({ type: "ADD_TO_BOOKMARKS", payload: bookmarks });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const bookmarkPost = async (postId) => {
    console.log(postId);
    try {
      const res = await axios.post(
        `/api/users/bookmark/${postId}`,
        {},
        {
          headers: { authorization: token },
        }
      );
      console.log(res);
      const {
        status,
        data: { bookmarks },
      } = res;
      console.log(bookmarks);
      if (status === 200) {
        userDispatch({ type: "ADD_TO_BOOKMARKS", payload: bookmarks });
        toast.success("🦄 Wow so easy!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (e) {
      const {
        response: { status, data },
      } = e;
      console.log(e);
      const [errors] = data.errors;
      if (status === 400) {
        toast.error(errors);
      }
    }
  };

  const removePostFromBookmarks = async (postId) => {
    try {
      const res = await axios.post(
        `/api/users/remove-bookmark/${postId}`,
        {},

        { headers: { authorization: token } }
      );

      console.log(res);
      const {
        status,
        data: { bookmarks },
      } = res;
      if (status === 200) {
        userDispatch({ type: "ADD_TO_BOOKMARKS", payload: bookmarks });
        toast.success("Removed");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const followUser = async (followUserId) => {
    console.log(followUserId);
    try {
      const res = await axios.post(
        `/api/users/follow/${followUserId}`,
        {},
        {
          headers: { authorization: token },
        }
      );
      const {
        status,
        data: { user, followUser },
      } = res;
      if (status === 200) {
        userDispatch({ type: "FOLLOW_USER", payload: [user, followUser] });
        toast.success(`You are following @${followUser.username}`);
      }

      console.log(res);
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };

  const unfollowUser = async (followUserId) => {
    console.log(followUserId);
    try {
      const res = await axios.post(
        `/api/users/unfollow/${followUserId}`,
        {},
        {
          headers: { authorization: token },
        }
      );
      const {
        status,
        data: { user, followUser },
      } = res;
      if (status === 200) {
        userDispatch({ type: "FOLLOW_USER", payload: [user, followUser] });
        toast.success(`You unfollowed @${followUser.username}`);
      }

      console.log(res);
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <UsersContext.Provider
      value={{
        getAllUsers,
        getUserByUsername,
        userState,
        userDispatch,
        getAllBookmarkPosts,
        bookmarkPost,
        removePostFromBookmarks,
        followUser,
        unfollowUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
