import { Modal, useMantineTheme } from "@mantine/core";
import "./ProfileModal.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/uploadAction";
import { updateUser } from "../../actions/userAction";

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();

  const { password, ...other } = data;
  const [formData, setFromData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const handleChange = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }

    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(updateUser(params.id, UserData));
    setModalOpened(false);
  };

  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        size="50%"
        title="Your info"
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        {/* Modal content */}
        <form action="" className="authForm infoForm">
          <div>
            <input
              type="text"
              className="infoInput"
              name="firstname"
              placeholder="First name"
              onChange={handleChange}
              value={formData.firstname}
              autoComplete="off"
            />
            <input
              type="text"
              className="infoInput"
              name="lastname"
              placeholder="Last name"
              onChange={handleChange}
              value={formData.lastname}
              autoComplete="off"
            />
          </div>

          <div>
            <input
              type="text"
              className="infoInput"
              name="bio"
              placeholder="Bio"
              onChange={handleChange}
              value={formData.bio}
              autoComplete="off"
            />
          </div>

          <div>
            <input
              type="text"
              className="infoInput"
              name="hobbies"
              placeholder="Hobbies"
              onChange={handleChange}
              value={formData.hobbies}
              autoComplete="off"
            />
            <input
              type="text"
              className="infoInput"
              name="country"
              placeholder="Country"
              onChange={handleChange}
              value={formData.country}
              autoComplete="off"
            />
          </div>
          <div>
            Profile Image:{" "}
            <input type="file" name="profileImage" onChange={onImageChange} />
            <br />
            Cover Image:{" "}
            <input type="file" name="coverImage" onChange={onImageChange} />
          </div>

          <button className="button infoButton" onClick={handleSubmit}>
            Update
          </button>
        </form>
      </Modal>
    </>
  );
}

export default ProfileModal;
