import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import authService from "../Services/auth.service";
import { AuthContext } from "../Context/auth.context";
import axios from "axios";

function EditProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");

  const { user, authenticateUser } = useContext(AuthContext);

  const { userId } = useParams();
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      authenticateUser();
      const storedToken = localStorage.getItem("authToken");

      let response = await axios.get(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/profile/${user._id}`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      setName(response.data.name);
      setEmail(response.data.email);
      setAbout(response.data.about);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const [profileImg, setProfileImg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    try {
      setLoading(true);

      //formData === enctype=multipart/formdata
      const uploadData = new FormData();

      //add the file to the formData
      uploadData.append("profileImg", e.target.files[0]);

      //send the file to our api
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/upload`,
        uploadData
      );

      console.log(response.data.fileUrl);
      setProfileImg(response.data.fileUrl);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const storedToken = localStorage.getItem("authToken");
      const requestBody = { name, email, about, profileImg };

      let response = await axios.put(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/profile/${user._id}`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );

      navigate(`/profile/${user._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProfile = () => {
    authService
      .deleteUser(user._id)
      .then(() => {
        navigate("/users");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //for updating IMGs

  return (
    <div className="edit-profile-page">
      <h3>Edit Profile</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Contact Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>About:</label>
        <input
          type="about"
          name="about"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />

        {/* for images */}
        <label htmlFor="profileImg" className="form-box">
          <p>Image</p>
          {profileImg ? (
            <>
              <img src={profileImg} alt="current" />
              <p className="small-buttons">Change Profile Image</p>
            </>
          ) : (
            <i className="fa fa-3x fa-camera">
              <p>Add Image</p>
            </i>
          )}
          <input
            type="file"
            name="profileImg"
            id="profileImg"
            onChange={handleUpload}
            className="image-input"
            required
          />
        </label>

        <button type="submit">Save Changes</button>
      </form>

      <button onClick={deleteProfile}>Delete Profile</button>
    </div>
  );
}

export default EditProfilePage;
