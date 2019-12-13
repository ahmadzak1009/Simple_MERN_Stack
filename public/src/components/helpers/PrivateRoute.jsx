import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

const PrivateRoute = props => {
  const [admin, setAdmin] = useState(undefined);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    const idAdmin = localStorage.getItem("id-admin");

    if (!token || !idAdmin) {
      props.history.push("/admin/login");
    }

    axios
      .get("/admins/" + idAdmin, { headers: { "auth-token": token } })
      .then(res => setAdmin(res.data))
      .catch(err => {
        console.log(err);
        localStorage.removeItem("auth-token");
        localStorage.removeItem("id-admin");
        props.history.push("/admin/login");
      });
  }, [setAdmin]);

  if (admin === undefined) {
    return <center>Loading...</center>;
  } else {
    return <>{props.children}</>;
  }
  // return <>{admin ? <center>Loading...</center> : props.children}</>;
};

export default withRouter(PrivateRoute);
