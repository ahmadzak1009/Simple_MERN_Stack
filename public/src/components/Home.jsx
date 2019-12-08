import React, { useContext } from "react";

import Shirt from "./shirt/Shirt";
import { ShirtContext } from "../ShirtContext";

const Home = props => {
  const { shirts, loading } = useContext(ShirtContext);

  return (
    <div className="container">
      <h2>Ini Home</h2>
      <div className="d-flex flex-wrap">
        {loading ? "loading..." : shirts.map(shirt => <Shirt key={shirt._id} shirt={shirt} />)}
      </div>
    </div>
  );
};

export default React.memo(Home);
