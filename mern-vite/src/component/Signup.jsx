import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../component/signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async(e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !password || !mobile || !confirmPassword) {
      alert("Please fill all the fields.");
      console.warn("Validation failed: All fields are required.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      console.warn("Validation failed: Password mismatch.");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          'content-type': 'application/json',
        },
      };

      const { data } = await axios.post('/api/user', {name,email,password, image, mobile}, config);
      alert("Registration Successfull");

      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);

      navigate('/chats');

    } catch (error) {
      alert('error occured');
      setLoading(false);
    }
  };

  const postDetails = (pics) => {
    setLoading(true);

    if (!pics) {
      alert("Please select an image");
      setLoading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "mern_chat");
      data.append("cloud_name", "aryanbackendproject");

      fetch("https://api.cloudinary.com/v1_1/aryanbackendproject/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.secure_url) {
            setImage(data.secure_url.toString());
            alert("Image uploaded successfully");
          } else {
            throw new Error("Upload failed");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to upload image");
          setLoading(false);
        });
    } else {
      alert("Only JPEG or PNG files are allowed");
      setLoading(false);
    }
  };

  return (
    <form className="signup-form" onSubmit={submitHandler}>
      <div className="form-group">
        <label>
          Name <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>
          Email <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Mobile Number</label>
        <input
          type="tel"
          placeholder="Enter your mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>
          Password <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>
          Confirm Password <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

        <div className="form-group">
        <label>Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />

        {image && (
          <div className="image-preview">
            <p>Image selected:</p>
            <img
              src={image}
              alt="Profile Preview"
              style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "10px", borderRadius: "8px" }}
            />
          </div>
        )}
      </div>


      <button
        type="submit"
        style={{
          marginTop: "15px",
          width: "100%",
          padding: "10px",
          backgroundColor: "#3182CE",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Sign Up"}
      </button>
    </form>
  );
};

export default Signup;
