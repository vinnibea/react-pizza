import React from "react";
import { Link } from "react-router-dom";

export const Empty = () => (
  <div className="cart_empty">
    <h2 className="cart_empty-title">Корзина пустая</h2>
    <h3 className="cart_empty-subtitle">
      Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы заказать
      пиццу, перейди на главную страницу.
    </h3>
    <div className="cart_empty-img"></div>
    <Link to="/">
      <div className="cart_empty-button">Вернуться назад</div>
    </Link>
  </div>
);
