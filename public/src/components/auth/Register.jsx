import React, { useState } from "react";
import axios from "axios";

const Register = props => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitRegister = async e => {
    e.preventDefault();

    try {
      const result = await axios.post("/users/add", { name, username, email, password });
      const data = await result.data;
      console.log(data);
      props.history.push("/login");
    } catch (err) {
      window.alert(err);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mx-auto">
            <h2 className="text-center py-3">Register User</h2>
            <form onSubmit={submitRegister}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={e => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={e => setUsername(e.target.value)}
                  value={username}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <button type="submit" className="btn btn-primary float-right">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
