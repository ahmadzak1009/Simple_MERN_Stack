import React, { useContext } from "react";
import Item from "./Item";
import { ShirtContext } from "../../ShirtContext";

const AllItems = props => {
  const { shirts, deleteShirt } = useContext(ShirtContext);

  return (
    <div className="container">
      <h2 className="py-3">All Shirts Item</h2>
      <ul className="list-group">
        {shirts.map(shirt => (
          <Item key={shirt._id} shirt={shirt} deleteShirt={deleteShirt} />
        ))}
      </ul>
    </div>
  );
};

export default AllItems;
