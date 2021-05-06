import { CART_ADD_ITEM, CART_SAVE_METHOD } from "../constants/cartConstants";
export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";

//Thêm vào cart
export const addToCart = (item, addToast, quantityCount) => async (dispatch, getState) => {

  if (addToast) {
    addToast("Đã thêm vào giỏ hàng", { appearance: "success", autoDismiss: true });
  }
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      ...item,
      quantity: quantityCount
    }
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cartData));
};
//decrease from cart
export const decreaseQuantity = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Giảm số lượng sản phẩm", {
        appearance: "warning",
        autoDismiss: true
      });
    }
    dispatch({ type: DECREASE_QUANTITY, payload: item });
  };
};
//delete from cart
export const deleteFromCart = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Xóa sản phẩm khỏi giỏ hàng", { appearance: "error", autoDismiss: true });
    }
    dispatch({ type: DELETE_FROM_CART, payload: item });
  };
};
//delete all from cart
export const deleteAllFromCart = addToast => {
  return dispatch => {
    if (addToast) {
      addToast("Xóa tất cả sản phẩm khỏi giỏ hàng", {
        appearance: "error",
        autoDismiss: true
      });
    }
    dispatch({ type: DELETE_ALL_FROM_CART });
  };
};

// get stock of cart item
export const cartItemStock = (item) => {
  if (item.stock) {
    return item.stock;
  }
};
export const savePayment = (payment) => async (dispatch, getState) => {
  dispatch({
    type: CART_SAVE_METHOD,
    payload: payment
  })
}