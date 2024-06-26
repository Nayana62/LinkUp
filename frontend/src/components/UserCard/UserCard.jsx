import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/userAction";
import { createChat } from "../../api/ChatRequest";
import toast from "react-hot-toast";

const UserCard = ({ person }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();

  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );

  const handleFollow = async () => {
    if (following) {
      dispatch(unfollowUser(person._id, user));
    } else {
      dispatch(followUser(person._id, user));

      try {
        // Send a request to create a chat
        await createChat({
          senderId: user._id,
          receiverId: person._id,
        });
        console.log("Chat created successfully");
      } catch (error) {
        console.log("Error creating chat:", error);
      }
    }

    setFollowing((prev) => !prev);
  };

  return (
    <div className="follower">
      <div>
        <img
          src={
            person.profilePicture
              ? publicFolder + person.profilePicture
              : publicFolder + "defaultProfile.png"
          }
          alt="profile"
          className="followerImg"
        />
        <div className="name">
          <span>{person.firstname}</span>
          <span>@{person.username}</span>
        </div>
      </div>
      <button
        className={following ? "button fc-button unfollow-botton" : "fc-button"}
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default UserCard;
