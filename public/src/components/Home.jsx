import React, { useState, useEffect } from "react";
import axios from "axios";

import Shirt from "./shirt/Shirt";

const Home = props => {
  const [shirts, setShirts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get("/shirts/", { cancelToken: source.token })
      .then(res => res.data)
      .then(data => setShirts(data), setLoading(false))
      .catch(err => {
        console.log(err);
        setLoading(true);
        if (axios.isCancel(err)) {
          console.log("cancelled");
        } else {
          throw err;
        }
      });

    return () => source.cancel();
  }, []);

  return (
    <div className="container">
      <h2>Ini Home</h2>
      {loading ? "loading..." : shirts.map(shirt => <Shirt key={shirt._id} shirt={shirt} />)}
    </div>
  );
};

export default React.memo(Home);
