import React, { useState, useEffect } from "react";
import axios from "axios";

const LoginAdmin = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) return props.history.push("/admin");
  }, [props.history]);

  const onSubmit = e => {
    e.preventDefault();

    axios
      .post("/admins/login", { username, password })
      .then(res => {
        localStorage.setItem("auth-token", res.data.token);
        localStorage.setItem("id-admin", res.data.id);
      })
      .then(() => props.history.push("/admin"))
      .catch(err => window.alert(err));
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mx-auto">
            <h2 className="text-center py-3">Login Admin</h2>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary float-right">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginAdmin;
