import React from "react";
import "./ProfileCard.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const posts = useSelector((state) => state.postReducer.posts);

  return (
    <div className="ProfileCard">
      <div className="profileImages">
        <img
          src={
            user.coverPicture
              ? serverPublic + user.coverPicture
              : serverPublic + "defaultCover.jpg"
          }
          alt="cover"
          className="cover"
        />
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="profile"
        />
      </div>

      <div className="profileName">
        <span>
          {user.firstname} {user.lastname}
        </span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>

          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === user._id).length}
                </span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/profile/${user._id}`}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
