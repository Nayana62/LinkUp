import React, { useEffect } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import { useState } from "react";
import ProfileModal from "../profileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequest";
import { logOut } from "../../actions/AuthAction";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const profileUSer = await UserApi.getUser(profileUserId);
        setProfileUser(profileUSer);
      }
    };

    fetchProfileUser();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>

        {user._id === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="info">
        <span>
          <b>Bio: </b>
        </span>
        <span>{profileUser.bio}</span>
      </div>

      <div className="info">
        <span>
          <b>Hobbies:</b>
        </span>
        <span>{profileUser.hobbies}</span>
      </div>

      <div className="info">
        <span>
          <b>Country:</b>
        </span>
        <span>{profileUser.country}</span>
      </div>

      <button className="button logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default InfoCard;
