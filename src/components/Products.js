// Products.js

import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";

function Products() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState([]);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    let componentMounted = true;
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      if (componentMounted) {
        const data = await response.json();
        setData(data);
        setFilter(data);
        setLoading(false);
      }
    };
    getProducts();
    return () => {
      componentMounted = false;
    };
  }, []);

  const Loading = () => (
    <div className="loading-container">
      {[1, 2, 3, 4, 5, 6, 7].map((index) => (
        <div className="loading-card" key={index}>
          <Skeleton height={400} width={"100%"} />
        </div>
      ))}
    </div>
  );

  const filterProducts = (category) => {
    const updateList = data.filter((x) => x.category === category);
    setFilter(updateList);
  };

  const sortProducts = (sortBy) => {
    let sortedList = [...filter];
    if (sortBy === "title") {
      sortedList.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "price") {
      sortedList.sort((a, b) => a.price - b.price);
    }
    setFilter(sortedList);
  };

  const ShowProducts = () => (
    <div className="row">
      {filter.map((product) => (
        <div className="col-6 col-md-6 col-lg-4 mb-3" key={product.id}>
          <div className="card h-100">
            <img
              src={product.image}
              className="m-3"
              style={{ height: "300px", width: "auto", objectFit: "contain" }}
              alt={product.title}
            />
            <div className="m-3 mb-0">
              <small className="card-title">
                {product.title.substring(0, 50)}...
              </small>
            </div>
            <div style={{ marginTop: "auto" }}>
              <div className="d-flex justify-content-between align-items-center">
                <div className="m-3">
                  <b>${product.price}</b>
                </div>
                <NavLink
                  className="stretched-link"
                  to={`/product/${product.id}`}
                >
                  <button className="btn btn-sm m-3 border-primary">
                    <i className="fa fa-arrow-right text-muted"></i>
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 my-3">
          <div className="filter-container d-flex justify-content-center flex-wrap mb-3">
            <button
              className="btn btn-outline-dark m-1 btn-sm"
              onClick={() => setFilter(data)}
            >
              All
            </button>
            <button
              className="btn btn-outline-dark m-1 btn-sm"
              onClick={() => filterProducts("women's clothing")}
            >
              Women's Clothing
            </button>
            <button
              className="btn btn-outline-dark m-1 btn-sm"
              onClick={() => filterProducts("men's clothing")}
            >
              Men's Clothing
            </button>
            <button
              className="btn btn-outline-dark m-1 btn-sm"
              onClick={() => filterProducts("jewelery")}
            >
              Jewelery
            </button>
            <button
              className="btn btn-outline-dark m-1 btn-sm"
              onClick={() => filterProducts("electronics")}
            >
              Electronics
            </button>
          </div>

          <div className="sort-container d-flex justify-content-center mb-3">
            <button
              className="btn btn-outline-dark m-1 btn-sm"
              onClick={() => sortProducts("title")}
            >
              Sort by Title
            </button>
            <button
              className="btn btn-outline-dark m-1 btn-sm"
              onClick={() => sortProducts("price")}
            >
              Sort by Price
            </button>
          </div>

          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
}

export default Products;
