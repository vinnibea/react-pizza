import React from "react";
import { useSelector } from "react-redux";
import "../styles/header.css";
import { Link } from "react-router-dom";

export const Header = () => {
  const cart = useSelector(({ cartReducer }) => cartReducer);
  
  return (
    <header className="header">
      <Link to="/">
        <div className="logo_section">
          <div className="header_logo" alt="pizza_logo"></div>{" "}
          <div className="titles-section">
            <h1 className="header_title">React Pizza</h1>
            <p className="header_subtitle">самая вкусная пицца во вселенной</p>
          </div>
        </div>
      </Link>

      <Link to="/cart">
        <div className="header_cart">
          <span>{cart.total} ₽</span>
          <div className="header_cart-hr"></div>
          <span className="header_cart-icon"></span>
          <span> {cart.totalPizzasLength || 0}</span>
        </div>
      </Link>
    </header>
  );
};
