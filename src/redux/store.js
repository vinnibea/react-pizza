import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

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

const cartReducer = (state = initialCart, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const currentPizzas = !state.items[action.payload.id]
                ? [action.payload]
                : [...state.items[action.payload.id].items, action.payload];
            const pizzasCount = currentPizzas.length;

            const newItem = {
                ...state.items,

                [action.payload.id]: {
                    items: currentPizzas,
                    pizzasCount,
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

    return axios.get(url).then(({ data }) => {
        dispatch(setItemsAction(data));
    });
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
