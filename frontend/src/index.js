import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import { save, load } from "redux-localstorage-simple";
import { Provider } from "react-redux";
import { fetchProducts } from "./redux/actions/productActions";
import { fetchBlogs } from "./redux/actions/blogActions";
import rootReducer from "./redux/reducers/rootReducer";
//import products from "./data/products.json";
import App from "./App";
import "./assets/scss/style.scss";
import * as serviceWorker from "./serviceWorker";


import { composeWithDevTools } from "redux-devtools-extension";
import { listUsers } from "./redux/actions/userActions";

const userInfoFormLocalStore=localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):null
const cartItemsFormLocalStore=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
const compareItemsFormLocalStore=localStorage.getItem('compareItems')?JSON.parse(localStorage.getItem('compareItems')):[]
const initialState={
  loginData:{users:userInfoFormLocalStore},
  //cartData:{cartItems:cartItemsFormLocalStore},
  //compareData:{compartItems:compareItemsFormLocalStore}
}
const store = createStore(
  rootReducer,
  // load(),
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default (store);

// fetch products from json file
store.dispatch(fetchProducts());
store.dispatch(fetchBlogs());

ReactDOM.render (
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
