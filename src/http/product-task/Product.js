import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
const Product = () => {
  const { productId } = useParams();
  const [details, setDetails] = useState({});

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => {
        console.log(response);
        setDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId]);

  const contentStyle = {
    borderLeft: `solid 3px #524C6B`,
    borderRadius: "5px",
    padding: "20px",
  };

  const detailStyle = {
    backgroundColor: "#B4D4EE",
    borderLeft: "solid 3px #524C6B",
    borderRadius: "5px",
    padding: "20px",
    textAlign: "left",
  };

  const imgStyle = {
    borderRadius: "5px",
    marginBottom: "30px",
  };
  return (
    <>
      {/* <h4 style={{ color: "red" }}>{productId}</h4> */}
      <div style={contentStyle}>
        <img
          src={details.image}
          alt={details.title}
          style={imgStyle}
          height="200"
        />
        <div style={detailStyle}>
          <p>Title: {details.title}</p>
          <p>Description: {details.description}</p>
          <p>Price: &#8377;{details.price}</p>
        </div>
      </div>
    </>
  );
};

export default Product;
