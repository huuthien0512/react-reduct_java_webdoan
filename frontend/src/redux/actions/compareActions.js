export const ADD_TO_COMPARE = "ADD_TO_COMPARE";
export const DELETE_FROM_COMPARE = "DELETE_FROM_COMPARE";

// Thêm vào compare
export const addToCompare = (item, addToast) => async (dispatch, getState) => {
  if (addToast) {
    addToast("Đã thêm vào Compare", {
      appearance: "success",
      autoDismiss: true
    });
  }
  dispatch({ type: ADD_TO_COMPARE, payload: item });
  localStorage.setItem('compareItems', JSON.stringify(getState().compareData));
};

// delete from compare
export const deleteFromCompare = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Removed From Compare", {
        appearance: "error",
        autoDismiss: true
      });
    }
    dispatch({ type: DELETE_FROM_COMPARE, payload: item });
  };
};
