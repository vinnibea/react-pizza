import React from "react";

export const CartItem = (pizza) => {

    return (
        <div className="cart_item">
        <img src={pizza.items[0].imageUrl} className="cart_img"></img>

        <div className="cart_item-left">
          <h4 className="cart_title">{pizza.items[0].name}</h4>
          <h5>nothing here yet</h5>
        </div>

        <div className="cart_item-buttons">
          <div className="cart_control">-</div>
          <p className="cart_pizza-q">{pizza.items.length}</p>
          <div className="cart_control">+</div>
        </div>

        <div className="cart_item-right">
          <p className="cart_pizza-price">{pizza.items[0].price} ₽</p>
          <div className="cart_control cart_control--delete">x</div>
        </div>
      </div>
    )
}