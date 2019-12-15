import React, { useEffect, useState } from "react";
import { Link, useLocation, withRouter } from "react-router-dom";
import axios from "axios";

const Navbar = props => {
  const [loading, setLoading] = useState(true);
  const [adminPage, setAdminPage] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("user-token");
    const idUser = localStorage.getItem("id-user");

    if (token || idUser) {
      async function verifyLogin(token, idUser) {
        try {
          const result = await axios.get("/users/" + idUser, { headers: { "user-token": token } });
          const data = result.data;
          setLogin(true);
          setUser(data);
        } catch (err) {
          localStorage.removeItem("user-token");
          localStorage.removeItem("id-user");
          setLogin(false);
          setUser(null);
        }
      }
      verifyLogin(token, idUser);
    }
    setLoading(false);
  }, [setLogin, loading]);

  let { pathname } = useLocation();
  useEffect(() => {
    const navLinks = document.querySelectorAll(".nav-link");
    for (let i = 0; i < navLinks.length; i++) {
      navLinks[i].classList.remove("active");
    }

    if (pathname.includes("/admin")) {
      setAdminPage(true);
    } else {
      setAdminPage(false);
    }

    const elAdmin = document.querySelector("#admin");
    const elAdminItem = document.querySelector("#admin-item");
    const elLogoutButton = document.querySelector("#admin-logout");

    switch (pathname) {
      case "/admin":
        if (elAdmin) return elAdmin.classList.add("active");
        break;
      case "/admin/shirts":
      case "/admin/shirt/add":
        if (elAdminItem) return elAdminItem.classList.add("active");
        break;
      case "/admin/login":
        if (elLogoutButton) return elLogoutButton.classList.add("d-none");
        break;
      default:
    }
  }, [pathname]);

  const logoutAdmin = e => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("id-admin");

    window.location.pathname = "/admin-login";
  };

  const userLogout = e => {
    localStorage.removeItem("user-token");
    localStorage.removeItem("id-user");

    window.location.pathname = window.location.pathname;
  };

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link to="/" className="navbar-brand">
              Shirt Shop
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                {adminPage ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin" id="admin">
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <div className="dropdown">
                        <Link
                          className="nav-link dropdown-toggle"
                          data-toggle="dropdown"
                          to="#"
                          id="admin-item"
                        >
                          Items
                        </Link>
                        <div className="dropdown-menu">
                          <Link className="dropdown-item" to="/admin/shirts">
                            All Items
                          </Link>
                          <Link className="dropdown-item" to="/admin/shirt/add">
                            Add Item
                          </Link>
                        </div>
                      </div>
                    </li>
                  </>
                ) : (
                  <>
                    {login && user ? (
                      <li className="nav-item">
                        <div className="dropdown">
                          <Link className="nav-link dropdown-toggle" data-toggle="dropdown" to="#">
                            {user.username}
                          </Link>
                          <div className="dropdown-menu">
                            <Link className="dropdown-item" to="#">
                              Cart
                            </Link>
                            <Link className="dropdown-item" to="#" onClick={userLogout}>
                              Logout
                            </Link>
                          </div>
                        </div>
                      </li>
                    ) : (
                      <>
                        <li className="nav-item">
                          <Link className="nav-link" to="/register">
                            Register
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/login">
                            Login
                          </Link>
                        </li>
                      </>
                    )}
                  </>
                )}
              </ul>
            </div>
            {adminPage ? (
              <button className="btn btn-danger" id="admin-logout" onClick={logoutAdmin}>
                Logout
              </button>
            ) : (
              <Link to="/admin" className="btn btn-warning">
                Admin
              </Link>
            )}
            {}
          </div>
        </nav>
      </>
    );
  }
};

export default withRouter(Navbar);
