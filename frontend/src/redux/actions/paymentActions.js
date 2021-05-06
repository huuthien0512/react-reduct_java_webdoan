// import {
//     ORDER_CREATE_REQUEST,
//   } from '../constants/orderConstants';
import { BASE_URL } from '../constants/URL_SERVER';
import axios from 'axios';
export const getDataPayment = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    //   const {
    //     userLogin: { userInfo },
    //   } = getState();
    //   const config = {
    //     headers: {
    //       Authorization: userInfo.token,
    //     },
    //   };
    const { data } = await axios.post(`${BASE_URL}/order/create`, order);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      // payload:error.response && error.response.data.msg
      payload: error.response && error.response.data,
    });
  }
};