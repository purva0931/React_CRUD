import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Categories from "./Categories";
import ProductList from "./ProductList";
import Product from "./Product";
const ProductTask = () => {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => {
        console.log(response);
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        console.log(response);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Products Catalog</h1>

      <div style={{ display: "flex", color: "#242230" }}>
        <section style={{ width: "25%", backgroundColor: "#9D8CA1" }}>
          <Categories categories={categories} />
        </section>
        <section style={{ width: "75%", backgroundColor: "#A7ABDD" }}>
          <Routes>
            <Route path="/:productId/:category" element={<Product />}></Route>
            <Route path=":category" element={<ProductList />}></Route>
          </Routes>
        </section>
      </div>
    </>
  );
};

export default ProductTask;
