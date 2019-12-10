import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = props => {
  const [adminPage, setAdminPage] = useState(false);
  // ACTIVE MENU SWITCHING
  // Get current location pathname
  let { pathname } = useLocation();
  // Will update/effect if pathname is changing
  useEffect(() => {
    // Remove all active menu classes from nav-links
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
    // Switch the active menu
    switch (pathname) {
      case "/admin":
        if (elAdmin) return elAdmin.classList.add("active");
        break;
      case "/admin/shirts":
      case "/admin/shirt/add":
        if (elAdminItem) return elAdminItem.classList.add("active");
        break;
      default:
    }
  }, [pathname]);

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
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">
                      Home
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
