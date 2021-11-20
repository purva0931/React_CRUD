// import axios from "axios";
// import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Categories = ({ categories }) => {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Categories</h2>
      <ul
        style={{
          listStyleType: "none",
          textTransform: "capitalize",
          textAlign: "center",
          padding: "0",
          margin: "0",
        }}
      >
        {Array.isArray(categories) &&
          categories.map((category) => (
            <li
              style={{
                padding: "20px 0",
                borderBottom: "1px solid #0B3142",
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "#242230" }}
                to={`/${category}`}
              >
                {category}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Categories;
