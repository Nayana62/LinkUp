import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../../api/PostRequest";
import moment from "moment";
import DeleteConfirmationModal from "../modal/DeleteModal";
import toast from "react-hot-toast";
import { deletePostAction } from "../../actions/postAction";

const Post = ({ data }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const formatRelativeTime = (date) => {
    const now = moment();
    const parsedDate = moment(date);
    const duration = moment.duration(now.diff(parsedDate));

    if (duration.asSeconds() < 60) {
      return "now";
    } else if (duration.asMinutes() < 60) {
      return `${Math.floor(duration.asMinutes())}m`;
    } else if (duration.asHours() < 24) {
      return `${Math.floor(duration.asHours())}h`;
    } else {
      return `${Math.floor(duration.asDays())}d`;
    }
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deletePostAction(data._id, user._id))
      .then(() => {
        toast.success("Post deleted successfully");
      })
      .catch(() => {
        toast.error("Failed to delete the post");
      });
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="Post">
      <div>
        <div className="post-user">
          <img
            src={
              data.profilePicture
                ? serverPublic + data.profilePicture
                : serverPublic + "defaultProfile.png"
            }
            alt=""
          />
          <p>
            <b>
              {data.firstname} {data.lastname}
            </b>
            <span>&#8226;</span>
            <span> {formatRelativeTime(data.createdAt)}</span>
          </p>
        </div>
        {data.userId === user._id && (
          <div className="delete-btn" onClick={handleDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </div>
        )}
      </div>

      <img src={data.image ? serverPublic + data.image : ""} alt="" />

      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>
        <span>{data.desc}</span>
      </div>

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span
        style={{ color: "var(--gray)", fontSize: "12px", marginTop: "-12px" }}
      >
        {likes} likes
      </span>

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Post;
