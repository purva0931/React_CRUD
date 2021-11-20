import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const ProductList = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/category/${category}`)
      .then((response) => {
        console.log(response);
        setProducts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category]);

  return (
    <>
      <h1 style={{ textAlign: "center", textTransform: "uppercase" }}>
        {category}
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          backgroundColor: "#A7ABDD",
        }}
      >
        {Array.isArray(products) &&
          products.map((prod) => (
            <Link to={`/${prod.id}/${category}`}>
              <div
                style={{
                  maxWidth: 200,
                  maxHeight: 300,
                  border: "1px solid #0b3142",
                  padding: 20,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  margin: 20,
                }}
              >
                <img src={prod.image} width="100" height="100" />
                <h4>{prod.title}</h4>
                <p>Price: &#8377;{prod.price}</p>
                {/* <p> {prod.description}</p> */}
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default ProductList;
