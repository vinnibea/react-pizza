import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CartItem } from "../components/CartItem";
import { Empty } from "../components/Empty";
import { Header } from "../components/Header";
import "../styles/cart.css";

export const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(({ cartReducer }) => cartReducer);

  const currentCartItems = Object.keys(cart.items).map((id) => cart.items[id]);
  console.log();
  return (
    <>
      <Header />

      {currentCartItems.length ? (
        <div className="cart">
          <div className="cart_header">
            <div className="cart_cart"></div>
            <div className="cart_delete"></div>
          </div>
          {currentCartItems.map((pizza) => (
            <CartItem {...pizza} key={pizza.items[0].imageUrl}></CartItem>
          ))}

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
