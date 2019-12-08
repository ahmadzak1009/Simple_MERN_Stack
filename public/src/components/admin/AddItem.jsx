import React, { useState } from "react";
import axios from "axios";

const AddItem = props => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState("");
  const [colors, setColors] = useState("");
  const [stock, setStock] = useState("");

  const inputToArr = val => {
    let arr = val.split(",");
    let trimArr = arr.map(ar => ar.trim());

    return trimArr;
  };

  const submitItem = e => {
    e.preventDefault();

    const newItem = {
      name,
      price,
      sizes,
      colors,
      stock
    };

    axios
      .post("/shirts/add", newItem)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

    setName("");
    setPrice("");
    setSizes("");
    setColors("");
    setStock("");

    props.history.push("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <form onSubmit={submitItem}>
            <h2 className="py-3 text-center">Form Add Item</h2>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">Rp.</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Price"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="from-group">
              <div className="row">
                <div className="col-md-6">
                  <label>Sizes</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="s, m, xl.. etc"
                    value={sizes}
                    onChange={e => setSizes(inputToArr(e.target.value))}
                  />
                  <small className="form-text text-muted">separate with commas ( , )</small>
                </div>
                <div className="col md-6">
                  <label>Stock</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Stock"
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Colors</label>
              <input
                type="text"
                className="form-control"
                placeholder="Colors"
                value={colors}
                onChange={e => setColors(inputToArr(e.target.value))}
              />
              <small className="form-text text-muted">separate with commas ( , )</small>
            </div>
            <div className="from-group">
              <label>Image</label>
              <div className="custom-file">
                <input type="file" className="custom-file-input" id="customFile" />
                <label className="custom-file-label">Choose file</label>
              </div>
            </div>
            <div className="row">
              <div className="col-md mt-3">
                <button className="btn btn-primary w-100">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
