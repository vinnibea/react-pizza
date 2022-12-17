import React from "react";
import { Header } from "../components/Header";
import { Catalog } from "../components/Catalog";
import { Categories } from "../components/Categories";


const filtersNames = [
  { name: "популярности", type: "rating" },
  { name: "цене", type: "price" },
  { name: "алфавиту", type: "name" },
];

export const Home = () => {
  return (
    <>
    <Header />
      <Categories filtersNames={filtersNames} />
      <Catalog />
    </>
  );
};
