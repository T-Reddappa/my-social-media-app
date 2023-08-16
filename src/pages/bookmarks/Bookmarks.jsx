import React, { useContext, useDebugValue, useEffect } from "react";
import { PostContext } from "../../contexts/PostContext";
import PostCard from "../../components/postCard/PostCard";
import { UsersContext } from "../../contexts/UserContext";
import { AuthContext } from "../../contexts/AuthContext";

const Bookmarks = () => {
  const {
    userState: { bookmarks },
  } = useContext(UsersContext);

  const {
    postState: { allPosts },
  } = useContext(PostContext);

  return (
    <div>
      <h2>Bookmarks</h2>
      <div className="page-container">
        {[...bookmarks]?.reverse().map((bookmarkedpost) => {
          const post = allPosts.find((post) => post._id === bookmarkedpost._id);
          return <PostCard post={post} key={post._id} />;
        })}
      </div>
    </div>
  );
};

export default Bookmarks;
