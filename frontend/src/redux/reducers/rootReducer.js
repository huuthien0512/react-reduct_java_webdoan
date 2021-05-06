import {
  userReducer,
  userRegister,
  userInfo,
  listUsers,
  userDelete,
  userUpdateProfile,
  userUpdatePassword,
  userAdminUpdate
} from "./userReducer";
import currencyReducer from "./currencyReducer";
import { productReducer, productSearch, productDelete, detailProduct, productUpdate, productCreate } from "./productReducer";
import blogReducer from "./blogReducer";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import compareReducer from "./compareReducer";
import { income, numOfUser, numOfProduct, numOfBlog, numOfOrder } from "./reportReducer";
import { myOrderList, orderDetails, orderUpdate, orderReducer, orderListAll } from "./orderReducer";
import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";
import reducers from "../../admin/reducers"

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" }),
  ...reducers,
  loginData: userReducer,
  registerData: userRegister,
  listUsersData: listUsers,
  userData: userInfo,
  userDeleteData: userDelete,
  userUpdateProfileData: userUpdateProfile,
  userUpdatePasswordData: userUpdatePassword,
  userAdminUpdateData: userAdminUpdate,
  currencyData: currencyReducer,
  productData: productReducer,
  productCreateData: productCreate,
  productDetailData: detailProduct,
  productUpdateData: productUpdate,
  productDeleteData: productDelete,
  searchedProductData: productSearch,
  blogData: blogReducer,
  cartData: cartReducer,
  orderCurrent: orderReducer,
  orderListAllData: orderListAll,
  myOrderListData: myOrderList,
  orderUpdateData: orderUpdate,
  orderDetailsData: orderDetails,
  wishlistData: wishlistReducer,
  compareData: compareReducer,
  incomeData: income,
  numOfUserData: numOfUser,
  numOfProductData: numOfProduct,
  numOfBlogData: numOfBlog,
  numOfOrderData: numOfOrder
});

export default rootReducer;
