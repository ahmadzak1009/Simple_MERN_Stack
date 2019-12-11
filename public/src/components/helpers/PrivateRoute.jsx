import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";

const PrivateRoute = props => {
  const [admin, setAdmin] = useState(undefined);

  const token = localStorage.getItem("auth-token");
  const idAdmin = localStorage.getItem("id-admin");

  useEffect(() => {
    if (!token || !idAdmin) {
      props.history.push("/admin/login");
    }

    Axios.get(`/admins/${idAdmin}`, { headers: { "auth-token": token } })
      .then(res => setAdmin(res.data))
      .catch(err => {
        console.log(err);
        localStorage.removeItem("token");
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
