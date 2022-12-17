import React, { useEffect } from "react";

import "../styles/catalog.css";
import { Card } from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchFromApi } from "../redux/store";


export const Catalog = () => {
  const dispatch = useDispatch();
  const pizzas = useSelector((state) => state.setReducer.items);
  const categories = useSelector(({ filterReducer }) => filterReducer.category);
  const filter = useSelector(({ filterReducer }) => filterReducer.filter);


  useEffect(() => {
    dispatch(fetchFromApi());
  }, []);

  useEffect(() => {
    dispatch(fetchFromApi(categories, filter));
  }, [categories, filter]);


  return (
    <main className="catalog">
      <h1 className="catalog_header">Все пиццы</h1>
      <section className="catalog_section">
        {pizzas &&
          pizzas.map((pizza) => {
            return <Card key={pizza.name} {...pizza} pizza={pizza} />;
          })}
      </section>
    </main>
  );
};
