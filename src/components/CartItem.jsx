import React from "react";
import { useDispatch } from "react-redux";
import {
  addCartAction,
  deleteCartAction,
  removeCartAction,
} from "../redux/store";

export const CartItem = (pizza) => {
  const dispatch = useDispatch();

  const handleAdd = (pizza) => {
    dispatch(addCartAction(pizza));
  };

  const handleRemove = (pizza) => {
    dispatch(removeCartAction(pizza));
  };

  const handleDelete = (pizza) => {
    dispatch(deleteCartAction(pizza));
  };
  return (
    <>
      {pizza.items && (
        <div className="cart_item">
          <img src={pizza.items[0].imageUrl} className="cart_img"></img>

          <div className="cart_item-left">
            <h4 className="cart_title">{pizza.items[0].name}</h4>
            <h5>nothing here yet</h5>
          </div>

          <div className="cart_item-buttons">
            <button
              className="cart_control cart_control--minus"
              onClick={() => handleRemove(pizza.items[0])}
              disabled={pizza.pizzasCount < 2}
            ></button>
            <p className="cart_pizza-q">{pizza.items.length}</p>
            <button
              className="cart_control  cart_control--plus"
              onClick={() => handleAdd(pizza.items[0])}
            ></button>
          </div>

          <div className="cart_item-right">
            <p className="cart_pizza-price">{pizza.pizzaPrice} ₽</p>
            <button
              className="cart_control  cart_control--cross"
              onClick={() => handleDelete(pizza.items[0])}
            ></button>
          </div>
        </div>
      )}
    </>
  );
};
