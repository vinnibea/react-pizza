import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryAction, setFilterAction } from "../redux/store";
import "../styles/categories.css";

const cats = ["Все", "Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"];

const catsObj = {
  Все: null,
  Мясные: 0,
  Вегетарианские: 1,
  Гриль: 3,
  Острые: 4,
  Закрытые: 5,
};

export const Categories = ({ filtersNames }) => {
  const [showFilters, setShowFilters] = useState(false);
  const categories = useSelector(({ filterReducer }) => filterReducer.category);
  const filters = useSelector(({ filterReducer }) => filterReducer.filter);
  const dispatch = useDispatch();
  const filterRef = useRef(null);
  let activeLabel = filtersNames.find((obj) => obj.type === filters).name;
 
  const onClickCategory = useCallback((index) => {
    dispatch(setCategoryAction(index));
  }, []);

  const onClickFilter = useCallback((name) => {
    dispatch(setFilterAction(name));
  }, []);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (!e.path.includes(filterRef.current)) {
        setShowFilters(false);
      }
    });
  }, []);

  useEffect(() => {
    setShowFilters(false);
  }, [filters]);

  return (
    <nav className="categories">
      <div className="categories_main">
        {Object.keys(catsObj).map((cat) => {
          return (
            <button
              key={cat}
              className={`categories_button ${
                categories === catsObj[cat] ? "categories_button--active" : ""
              }`}
              onClick={() => onClickCategory(catsObj[cat])}
            >
              {cat}
            </button>
          );
        })}
      </div>
      <div className="categories_sort">
        <p className="categories_sort-params">Сортировка по:</p>
        <div className="categories_sort-menu" ref={filterRef}>
          <p
            className="categories_sort-params categories_sort-params--orange"
            onClick={() => setShowFilters(!showFilters)}
          >
            {activeLabel}
          </p>
          {showFilters && (
            <ul className="dropdown">
              {filtersNames.map((filterItem) => {
                return (
                  <li
                    className={`dropdown_item ${
                      filters === filterItem.type ? "dropdown_item--active" : ""
                    }`}
                    key={filterItem.name}
                    onClick={() => onClickFilter(filterItem.type)}
                  >
                    {filterItem.name}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

Categories.defaultProps = {
  filtersNames: [{ name: "" }],
};
