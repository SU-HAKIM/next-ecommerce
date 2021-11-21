import Link from "next/link";

import type { NextPage } from "next";
import React, { useState } from "react";
import FileBase from "react-file-base64";

const Create: NextPage = () => {
  const [imageField, setImageField] = useState("pick");
  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(data);
    let response = await fetch(
      "http://localhost:3000/api/products/createProduct",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let product = await response.json();
    console.log("newly created product", product);
    setData({
      name: "",
      price: "",
      description: "",
      image: "",
    });
  };
  console.log(imageField);

  return (
    <div className="container">
      <div className="row">
        <div className="card col s12">
          <h3 style={{ marginBottom: "20px" }}>Create Post Here..</h3>
          <form onSubmit={handleSubmit}>
            <div className="product-create">
              <input
                type="name"
                placeholder="name"
                name="name"
                value={data.name}
                onChange={handleChange}
                className="product-create__input"
              />
              <input
                type="price"
                placeholder="price"
                name="price"
                value={data.price}
                onChange={handleChange}
                className="product-create__input"
              />
            </div>
            <textarea
              className="product-create__description"
              name="description"
              value={data.description}
              onChange={handleChange}
              placeholder="description"
            ></textarea>
            <div>
              <p>
                <label>
                  <input
                    name="group"
                    type="radio"
                    value="pick"
                    onChange={(e) => setImageField(e.target.value)}
                    checked={imageField === "pick"}
                  />
                  <span>Pick</span>
                </label>
              </p>
              <p>
                <label>
                  <input
                    name="group"
                    type="radio"
                    value="link"
                    onChange={(e) => setImageField(e.target.value)}
                    checked={imageField === "link"}
                  />
                  <span>Link</span>
                </label>
              </p>
            </div>
            <div className="product-create__image">
              {imageField === "pick" ? (
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }: { base64: string }) => {
                    setData({ ...data, image: base64 });
                  }}
                />
              ) : (
                <input
                  type="text"
                  value={data.image}
                  onChange={handleChange}
                  placeholder="image link"
                  style={{ width: "300px", display: "block" }}
                  name="image"
                />
              )}
              {data.image && (
                <img
                  alt="inserted pic"
                  src={data.image ? data.image : ""}
                  width={200}
                  height={150}
                  style={{ display: "block", marginTop: "10px" }}
                />
              )}
            </div>
            <button
              type="submit"
              className="waves-effect waves-light btn"
              style={{ margin: "10px" }}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
