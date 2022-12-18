import React from "react";
import { Header } from "../components/Header";
import { Catalog } from "../components/Catalog";
import { Categories } from "../components/Categories";
import db from '../db.json';


const filtersNames = [
  { name: "популярности", type: "rating" },
  { name: "цене", type: "price" },
  { name: "алфавиту", type: "name" },
];

console.log(fetch(db).then(pizza2 => pizza2).then(pizza => pizza.json()));

export const Home = () => {
  return (
    <>
    <Header />
      <Categories filtersNames={filtersNames} />
      <Catalog />
    </>
  );
};
