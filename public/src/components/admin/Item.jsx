import React from "react";
import { Link } from "react-router-dom";

const Item = props => {
  const { name, price, img, stock, _id } = props.shirt;
  return (
    <li className="list-group-item">
      <div className="d-flex align-item-center justify-content-center">
        <div style={{ width: "100px", maxHeight: "60px" }} className="mr-2">
          <img src={require(`../../img/shirts/${img}`)} alt="shirt" className="img-fluid" />
        </div>
        <div className="flex-grow-1 ">
          <h5>{name}</h5>
          <p className="mb-0">Rp. {price}</p>
        </div>
        <p className="my-auto mr-3">Stock: {stock}</p>
        <Link to={`/admin/shirt/${_id}`} className="px-3 my-auto">
          Edit
        </Link>
        <Link to="#" className="px-3 my-auto text-danger" onClick={() => props.deleteShirt(_id)}>
          Delete
        </Link>
      </div>
    </li>
  );
};

export default Item;
