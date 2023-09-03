import React, { createContext, useContext, useReducer, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const initialPostData = {
    input: "",
    media: null,
    mediaAlt: "",
  };

  const initialPostsState = {
    allPosts: [],
    postData: initialPostData,
    postData: initialPostData,
    post: {},
  };

  const postsReducer = (state, action) => {
    switch (action.type) {
      case "GET_ALL_POSTS":
        return { ...state, allPosts: action.payload };
      case "CREATE_NEW_POST":
        return { ...state, allPosts: action.payload };
      case "DELETE_POST":
        return { ...state, allPosts: action.payload };
      case "LIKE_A_POST":
        return { ...state, allPosts: action.payload };
      case "DISLIKE_POST":
        return { ...state, allPosts: action.payload };
      case "EDIT_POST":
        return { ...state, allPosts: action.payload };
      default:
        return state;
    }
  };

  const [postState, postDispatch] = useReducer(postsReducer, initialPostsState);

  //gets all posts
  const getAllPosts = async () => {
    try {
      const res = await axios.get("/api/posts");
      const {
        status,
        data: { posts },
      } = res;
      if (status === 200) {
        postDispatch({ type: "GET_ALL_POSTS", payload: posts });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createPost = async ({ content, media }) => {
    console.log(content);
    try {
      const res = await axios.post(
        "/api/posts",
        { postData: { content, media } },
        { headers: { authorization: token } }
      );

      const {
        status,
        data: { posts },
      } = res;
      console.log(posts);

      if (status === 201) {
        postDispatch({ type: "CREATE_NEW_POST", payload: posts });
        toast.success("You posted successfully");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const likePost = async (postId) => {
    console.log(postId);

    try {
      const res = await axios.post(
        `/api/posts/like/${postId}`,
        {},

        { headers: { authorization: token } }
      );

      const { status, data } = res;

      if (status === 201) {
        console.log(res);
        postDispatch({ type: "LIKE_A_POST", payload: data.posts });
        // toast.success("You liked the post");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const dislikePost = async (postId) => {
    try {
      const res = await axios.post(
        `/api/posts/dislike/${postId}`,
        {},
        { headers: { authorization: token } }
      );

      const {
        status,
        data: { posts },
      } = res;
      if (status === 201) {
        postDispatch({ type: "DISLIKE_POST", payload: posts });
        // toast.success("You disliked the post");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deletePost = async (postId) => {
    try {
      const res = await axios.delete(`/api/posts/${postId}`, {
        headers: { authorization: token },
      });
      const {
        status,
        data: { posts },
      } = res;

      if (status === 201) {
        postDispatch({ type: "DELETE_POST", payload: posts });
        toast.success("Post deleted Successfully");
      }
    } catch (e) {
      console.log(e);
      const {
        response: { status },
      } = e;
      if (status === 400) {
        toast.error("You cannot delete other user's post");
      }
    }
  };

  const editPost = async (postId, { content }) => {
    try {
      const res = await axios.post(
        `/api/posts/edit/${postId}`,
        { postData: { content } },
        { headers: { authorization: token } }
      );

      const {
        status,
        data: { posts },
      } = res;
      console.log(res);

      if (status === 201) {
        postDispatch({ type: "EDIT_POST", payload: posts });
        console.log(posts);
        console.log("editedd");
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    }
  };

  const isLikedByCurrentUser = (post, user) => {
    return post?.likes?.likedBy?.some(
      (likedUser) => likedUser.username === user.username
    );
  };

  return (
    <PostContext.Provider
      value={{
        postState,
        getAllPosts,
        createPost,
        likePost,
        dislikePost,
        deletePost,
        editPost,
        isLikedByCurrentUser,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
