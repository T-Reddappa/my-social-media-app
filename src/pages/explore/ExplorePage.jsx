import React, { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";
import PostCard from "../../components/postCard/PostCard";

const ExplorePage = () => {
  const {
    postState: { allPosts },
  } = useContext(PostContext);
  return (
    <div>
      <h2 onClick={() => console.log(allPosts)}>Explore Page</h2>
      <div className="page-container">
        {allPosts?.map((post) => (
          <PostCard post={post} />
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
