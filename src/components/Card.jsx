import React, { useState } from "react";
import "../styles/Card.css";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../redux/store";

const sizesOfPizzas = [26, 30, 40];
export const Card = ({ name, types, sizes, price, imageUrl, pizza }) => {
  const [activeDough, setActiveDough] = useState("");
  const [activeSize, setActiveSize] = useState("");
  const dough = ["тонкое", "традиционное"];
  const dispatch = useDispatch();
  const cartSelector = useSelector(({ cartReducer }) => cartReducer);
  const local = useSelector(({local }) => local);

  console.log(local)

  const addedPizzas =
    cartSelector.items[pizza.id] && cartSelector.items[pizza.id].pizzasCount;

    const handleAddStore = (name, pizza) => {
      localStorage.setItem(name, JSON.stringify(pizza))
      dispatch({type: 'ADD', payload: {...localStorage}})
    }

    const handleDeleteStore = (name) => {
      localStorage.removeItem(name)

      dispatch({type: 'REMOVE', payload: {...localStorage}})
    }

  return (
    <article className="card">
      {Object.keys(local).map(l => local[l])}
      <img alt={name} className="card_img" src={imageUrl}></img>
      <h3 className="card_title">{name}</h3>
      <div className="card_settings">
        <div className="small-wrapper">
          {dough.map((type) => (
            <div
              className={classNames("card_dough", {
                "card_sizes--active": activeDough === type,
                disabled: !types.includes(dough.indexOf(type)),
              })}
              onClick={() => setActiveDough(type)}
              key={type}
            >
              {type}
            </div>
          ))}
        </div>
        <div classnames="small-wrapper">
          {sizesOfPizzas.map((s) => (
            <div
              className={classNames("card_sizes", {
                "card_sizes--active": activeSize === s,
                disabled: !sizes.includes(s),
              })}
              onClick={() => setActiveSize(s)}
              key={s}
            >
              {s} см.
            </div>
          ))}
        </div>
      </div>
      <div className="card_bottom" onClick={() => dispatch(cartAction(pizza))}>
        <p className="card_price">От {price} ₽</p>
        <div className="card_add">
          {" "}
          + Добавить{" "}
          <span
            className={classNames("card_span", {
              "card_span--active": addedPizzas > 0,
            })}
          >{addedPizzas || ""}
          </span>
        </div>
      </div>
    </article>
  );
};
