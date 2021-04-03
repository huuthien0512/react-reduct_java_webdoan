import {userReducer, userDetails, listUsers} from "./userReducer";
import currencyReducer from "./currencyReducer";
import productReducer from "./productReducer";
import blogReducer from "./blogReducer";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import compareReducer from "./compareReducer";
import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";
import reducers from "../../admin/reducers"

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" }),
  ...reducers,
  loginData: userReducer,
  listUsersData:listUsers,
  userData: userDetails,
  currencyData: currencyReducer,
  productData: productReducer,
  blogData: blogReducer,
  cartData: cartReducer,
  wishlistData: wishlistReducer,
  compareData: compareReducer
});

export default rootReducer;
