import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState(''); // Initialize with an empty string
  const [email, setEmail] = useState(''); // Initialize with an empty string
  const [age, setAge] = useState(''); // Initialize with an empty string
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/getUser/" + id)
      .then((result) => {
        console.log(result);
        setName(result.data.name || ''); // Fallback to empty string
        setEmail(result.data.email || ''); // Fallback to empty string
        setAge(result.data.age || ''); // Fallback to empty string
      })
      .catch((err) => console.log(err));
  }, [id]); // Add dependency to avoid infinite loop

  const Update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/updateUser/" + id, { name, email, age }) // Corrected URL
      .then((result) => {
        console.log(result);
        navigate("/"); // Redirect after update (optional)
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={Update}>
          <h2>Update User</h2>
          <div className="mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="age">Age</label>
            <input
              type="text"
              id="age"
              placeholder="Enter Age"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
