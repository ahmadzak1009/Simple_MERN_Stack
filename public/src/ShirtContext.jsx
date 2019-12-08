import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShirtContext = createContext();

export const ShirtProvider = props => {
  const [shirts, setShirts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get("/shirts/", { cancelToken: source.token })
      .then(res => res.data)
      .then(data => {
        if (data !== null) {
          setShirts(data);
          setLoading(false);
        }
      })
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
  }, [setShirts]);

  const updateShirt = (id, updatedShirt) => {
    axios
      .patch(`/shirts/${id}`, updatedShirt)
      .then(res => res.data)
      .then(data => {
        setShirts(
          shirts.map(shirt => {
            if (shirt._id === data._id) {
              shirt.name = data.name;
              shirt.price = data.price;
              shirt.sizes = data.sizes;
              shirt.colors = data.colors;
              shirt.stock = data.stock;
            }
            return shirt;
          })
        );
      })
      .catch(err => console.log(err));

    window.location.pathname = "/admin/shirts";
  };

  const deleteShirt = id => {
    let conf = window.confirm("Comfirm delete " + id);

    if (conf) {
      axios
        .delete(`/shirts/${id}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

      setShirts(shirts.filter(shirt => shirt._id !== id));
    }
  };

  return (
    <ShirtContext.Provider value={{ shirts, setShirts, loading, updateShirt, deleteShirt }}>
      {props.children}
    </ShirtContext.Provider>
  );
};
