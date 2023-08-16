import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { PostContext } from "../../contexts/PostContext";

import "./home.css";
import Share from "../../components/share/share";
import PostCard from "../../components/postCard/PostCard";

const Home = () => {
  const { loginHandler, signupHandler, logoutHandler } =
    useContext(AuthContext);
  const { getAllPosts, postState } = useContext(PostContext);
  // const login = () => {
  //   loginHandler("reddy", "reddy1234");
  // };

  // const signup = () => {
  //   signupHandler("redddy", "t", "redddy", "redddy123");
  // };

  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <div className="page-container">
      <Share />
      <div>
        <h2>Latest Posts</h2>

        {[...postState.allPosts]?.reverse().map((post) => (
          <PostCard post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
