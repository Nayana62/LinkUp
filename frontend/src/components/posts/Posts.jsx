import React, { useEffect } from "react";
import "./Posts.css";
import Post from "../post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../actions/postAction";
import { useParams } from "react-router-dom";

const Posts = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    if (user._id) {
      dispatch(getTimelinePosts(user._id));
    }
  }, [dispatch, user]);

  if (!posts) return "No Posts";

  if (params.id) posts = posts.filter((post) => post.userId === params.id);

  return (
    <div className="Posts">
      {loading
        ? "Fetching posts...."
        : posts.map((post) => {
            return <Post data={post} key={post._id} />;
          })}
    </div>
  );
};

export default Posts;
