import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import db from '../db.json';

const initialState = {
    items: [],
};

const initialCart = {
    items: {},
};

export const cartAction = (pizza) => ({
    type: "ADD_TO_CART",
    payload: pizza,
});

export const emptyCartAction = () => ({
    type: "SET_EMPTY",
});

export const addCartAction = (newPizza) => ({
    type: "SET_ADD",
    payload: newPizza,
});

export const removeCartAction = (removedPizza) => ({
    type: "SET_REMOVE",
    payload: removedPizza,
});

export const deleteCartAction = (deletedPizzas) => ({
    type: "SET_DELETE",
    payload: deletedPizzas,
});

const cartReducer = (state = initialCart, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            const currentPizzas = !state.items[action.payload.id]
                ? [action.payload]
                : [...state.items[action.payload.id].items, action.payload];
            const pizzasCount = currentPizzas.length;
            const pizzaPrice = currentPizzas[0].price * pizzasCount;

            const newItem = {
                ...state.items,

                [action.payload.id]: {
                    items: currentPizzas,
                    pizzasCount,
                    pizzaPrice,
                },
            };

            const newObject = {
                ...state,
                items: newItem,
                total: action.payload.price + (state.total || 0),
            };

            const totalPizzasLength = [].concat.apply([], Object.keys(newObject.items).map(id => newObject.items[id].items)).length;

            return {
                ...newObject,
                totalPizzasLength,
            }
        }

        case 'SET_EMPTY':
            return {
                items: {},
            }

        case 'SET_ADD': {
            const currentPizzas = [...state.items[action.payload.id].items, state.items[action.payload.id].items[0]];
            const pizzasCount = currentPizzas.length;
            const pizzaPrice = currentPizzas[0].price * pizzasCount;

            const newItem = {
                ...state.items,

                [action.payload.id]: {
                    items: currentPizzas,
                    pizzasCount,
                    pizzaPrice,
                },
            };

            const newObject = {
                ...state,
                items: newItem,
                total: action.payload.price + (state.total || 0),
            };

            const totalPizzasLength = [].concat.apply([], Object.keys(newObject.items).map(id => newObject.items[id].items)).length;
            return {
                ...newObject,
                totalPizzasLength,
            }
        }


        case 'SET_REMOVE': {
            const currentPizzas = [...state.items[action.payload.id].items];
            const pizzasCount = currentPizzas.length = currentPizzas.length - 1 || 1;
            const pizzaPrice = currentPizzas[0].price * pizzasCount;

            const newItem = {
                ...state.items,

                [action.payload.id]: {
                    items: currentPizzas,
                    pizzasCount,
                    pizzaPrice,
                },
            };

            const newObject = {
                ...state,
                items: newItem,
            };

            const total = state.total - currentPizzas[0].price;

            const totalPizzasLength = [].concat.apply([], Object.keys(newObject.items).map(id => newObject.items[id].items)).length;

            return {
                ...newObject,
                totalPizzasLength,
                total: total < 0 ? state.total : total,
            }

        }

        case 'SET_DELETE': {

            const currentPizzas = [...state.items[action.payload.id].items];
            const pizzasCount = currentPizzas.length;
            const pizzaPrice = currentPizzas[0].price * pizzasCount;

            const newItem = {
                ...state.items,

                [action.payload.id]: {
                    items: [],
                    pizzasCount: 0,
                    pizzaPrice: 0,
                },
            };

            const newObject = {
                ...state,
                items: newItem,
                total: state.total - pizzaPrice,
            };

            const totalPizzasLength = [].concat.apply([], Object.keys(newObject.items).map(id => newObject.items[id].items)).length;

            return {
                ...newObject,
                totalPizzasLength,
            }

        }


        default:
            return state;
    }
};

export const setItemsAction = (items) => ({
    type: "SET_PIZZAS",
    payload: items,
});

export const setCategoryAction = (cat) => ({
    type: "SET_CATEGORY",
    payload: cat,
});

export const fetchFromApi = (category, filter) => (dispatch) => {
    let url = "http://localhost:3000/pizzas?";
    if (category !== null) {
        url += `&category=${category}`;
    }

    if (filter) {
        url += `&_sort=${filter}&_order=asc`;
    }

    return dispatch(setItemsAction(db.pizzas));
};

export const setFilterAction = (filterOptions) => ({
    type: "SORT_PIZZAS",
    payload: filterOptions,
});

const setReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PIZZAS":
            return {
                ...state,
                items: action.payload,
            };
        default:
            return state;
    }
};

const initialFilter = {
    filter: "rating",
    category: null,
};

const filterReducer = (state = initialFilter, action) => {
    switch (action.type) {
        case "SORT_PIZZAS":
            return { ...state, filter: action.payload };
        case "SET_CATEGORY":
            return { ...state, category: action.payload };
        default:
            return state;
    }
};

const reducer = combineReducers({
    setReducer,
    filterReducer,
    cartReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
