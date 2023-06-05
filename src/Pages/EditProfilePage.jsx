import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import authService from "../Services/auth.service";
import { AuthContext } from "../Context/auth.context";
import axios from "axios";

function EditProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const storedToken = localStorage.getItem("authToken");
      const requestBody = { name, email };

      let response = await axios.put(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/profile/${user._id}`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );

      navigate(`/profile`);
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

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Save Changes</button>
      </form>

      <button onClick={deleteProfile}>Delete Profile</button>
    </div>
  );
}

export default EditProfilePage;
