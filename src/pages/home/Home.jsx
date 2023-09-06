import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { PostContext } from "../../contexts/PostContext";
import WhatshotIcon from "@mui/icons-material/Whatshot";

import "./home.css";
import Share from "../../components/share/share";
import PostCard from "../../components/postCard/PostCard";
import { UsersContext } from "../../contexts/UserContext";
import { avatarImages } from "../../utils/avatars";

const Home = () => {
  const { currentUser, loginHandler, signupHandler, logoutHandler } =
    useContext(AuthContext);
  const {
    getAllPosts,
    postState: { allPosts },
    postDispatch,
  } = useContext(PostContext);
  const { editUserProfile } = useContext(UsersContext);

  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <div className="page-container">
      <Share />
      <div>
        <div className="homepage-heading-container">
          <div></div>
          <h2>Latest Posts</h2>
          <div>
            <select
              className="sorting-options"
              name="sort-posts"
              id="sort-posts"
              onChange={(e) =>
                postDispatch({
                  type: e.target.value,
                  payload: e.target.value,
                })
              }
            >
              <option value="" disabled selected>
                Sort By
              </option>
              <option value="SORT_BY_TRENDING">Trending</option>
              <option value="SORT_BY_LATEST">Latest</option>
              <option value="SORT_BY_OLDEST">Oldest</option>
            </select>
          </div>
        </div>

        {[...allPosts]?.reverse().map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
