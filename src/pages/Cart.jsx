import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CartItem } from "../components/CartItem";
import { Empty } from "../components/Empty";
import { Header } from "../components/Header";
import { emptyCartAction } from "../redux/store";
import "../styles/cart.css";

export const Cart = () => {
  const cart = useSelector(({ cartReducer }) => cartReducer);
  const dispatch = useDispatch();

  const currentCartItems = Object.keys(cart.items).map((id) => cart.items[id]);
  const handleEmptyCart = () => {
    if (window.confirm("Delete all?")) {
      dispatch(emptyCartAction());
    }
  };

  return (
    <>
      <Header />

      {cart.totalPizzasLength ? (
        <div className="cart cart--full">
          <div className="cart_header">
            <div className="cart_cart">
              <span className="cart_icon"></span>
              <h3 className="cart_header-title">Корзина</h3>
            </div>
            <div className="cart_delete-section">
              <div
                className="cart_delete"
                onClick={() => handleEmptyCart()}
              ></div>
              <p>Очистить корзину</p>
            </div>
          </div>
          {currentCartItems.map((pizza) => {
            if (pizza.items[0]) {
              return (
                <CartItem {...pizza} key={pizza.items[0].imageUrl}></CartItem>
              );
            }
            return "";
          })}

          <div className="cart_bottom">
            <p>
              Всего пицц:{" "}
              <span className="cart_bottom-q">
                {cart.totalPizzasLength} шт.
              </span>
            </p>
            <p>
              Сумма заказа:{" "}
              <span className="cart_bottom-price">{cart.total} ₽</span>
            </p>
          </div>
          <div className="cart_buttons">
            <Link to="/">
              <div className="cart_button cart_button--back">
                {" "}
                {`< Вернуться назад`}
              </div>
            </Link>
            <div className="cart_button cart_button--checkout">
              Оплатить сейчас
            </div>
          </div>
        </div>
      ) : (
        <div className="cart">
          <Empty />
        </div>
      )}
    </>
  );
};
