import React, { useContext, useState, useEffect } from "react";
import { ShirtContext } from "../../ShirtContext";

const EditItem = props => {
  const { shirts, updateShirt } = useContext(ShirtContext);

  const idItem = props.match.params.id;
  const theItem = shirts.filter(shirt => shirt._id === idItem);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState("");
  const [colors, setColors] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (theItem.length !== 0) {
      const { name, price, sizes, colors, stock } = theItem[0];
      setName(name);
      setPrice(price);
      setSizes(sizes);
      setColors(colors);
      setStock(stock);
    }
  }, [shirts]);

  const inputToArr = val => {
    let arr = val.split(",");
    let trimArr = arr.map(ar => ar.trim());

    return trimArr;
  };

  const onSubmit = e => {
    e.preventDefault();

    const editedItem = { name, price, sizes, colors, stock };

    updateShirt(idItem, editedItem);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <form onSubmit={onSubmit}>
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

export default EditItem;
