import React from "react";
import { Link } from "react-router-dom";

const Shirt = props => {
  const { img, name, price, _id } = props.shirt;
  return (
    <div className="col-md-3">
      <div className="card mb-2">
        <img
          src={require(`../../img/shirts/${img}`)}
          alt={name}
          className="img-card-top img-fluid"
        />
        <div className="card-body position-relative">
          <Link to={`/shirt/${_id}`}>
            <h5 className="card-title mb-0">{name}</h5>
          </Link>
          <p className="card-text">Rp. {price}</p>
          <button className="btn btn-primary btn-sm w-100">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Shirt;
