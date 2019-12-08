import React, { useEffect, useState } from "react";
import axios from "axios";

const ShirtDetails = props => {
  const [oneShirt, setOneShirt] = useState();
  const [loading, setLoading] = useState(true);

  const id = props.match.params.id;
  useEffect(() => {
    axios
      .get(`/shirts/${id}`)
      .then(res => res.data)
      .then(data => {
        if (oneShirt === undefined) {
          setOneShirt(data);
          setLoading(false);
        }
      })
      .catch(err => console.log(err));
  }, [id, oneShirt]);

  return loading ? (
    <center>loading...</center>
  ) : (
    <div className="container">
      <h2 className="py-3 text-center">{oneShirt.name}</h2>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <ul className="list-group">
            <li className="list-group-item">
              <img
                src={require("../../img/shirts/" + oneShirt.img)}
                alt="name"
                className="img-fluid"
              />
            </li>
            <li className="list-group-item">
              <p>
                <strong>Price :</strong> {oneShirt.price}
              </p>
              <p>
                <strong>Sizes :</strong>{" "}
                {oneShirt.sizes.map(size => (
                  <Size key={size} size={size} />
                ))}
              </p>
              <p>
                <strong>Colors :</strong> {oneShirt.colors}
              </p>
              <p>
                <strong>Stock :</strong> {oneShirt.stock}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

function Size(props) {
  return <span className="badge badge-primary mr-2">{props.size}</span>;
}

export default ShirtDetails;
