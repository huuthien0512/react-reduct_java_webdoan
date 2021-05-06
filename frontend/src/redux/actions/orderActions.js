import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_ALL_REQUEST,
  ORDER_LIST_ALL_SUCCESS,
  ORDER_LIST_ALL_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  ORDER_UPDATE_FAIL,
} from '../constants/orderConstants';
import { BASE_URL } from '../constants/URL_SERVER';
import axios from 'axios';
export const createOrder = (order) => async (dispatch, getState) => {
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
    localStorage.setItem("orderId", data.id);
    console.log(localStorage.getItem("orderId"))
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

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    // const {
    //   userLogin: { userInfo },
    // } = getState();
    // const config = {
    //   headers: {
    //     Authorization: userInfo.token,
    //   },
    // };
    const { data } = await axios.get(`${BASE_URL}/order/${id}`);
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: userInfo.token,
      },
    };
    const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      // payload:error.response && error.response.data.msg
      payload: error.response && error.response.data.msg,
    });
  }
};

export const listOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_LIST_ALL_REQUEST });
    // const userLogin = getState().loginData.userInfo;
    // const config = {
    //   headers: {
    //     Authorization: userInfo.token,
    //   },
    // };
    const { data } = await axios.get(`${BASE_URL}/orders`);
    dispatch({
      type: ORDER_LIST_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_ALL_FAIL,
      // payload:error.response && error.response.data.msg
      payload: error.response && error.response.data,
    });
  }
};

export const updateOrder = (order, id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_UPDATE_REQUEST });
    // const userLogin = getState().loginData.userInfo;
    // const config = {
    //   headers: {
    //     Authorization: userInfo.token,
    //   },
    // };
    console.log(order)
    const { data } = await axios.put(`${BASE_URL}/order/admin/update/${id}`, order);
    dispatch({
      type: ORDER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_UPDATE_FAIL,
      // payload:error.response && error.response.data.msg
      payload: error.response && error.response.data,
    });
  }
};

export const updateStatus = (id) => async (dispatch) => {
  try {
    console.log(id)
    dispatch({ type: ORDER_UPDATE_REQUEST });
    // const userLogin = getState().loginData.userInfo;
    // const config = {
    //   headers: {
    //     Authorization: userInfo.token,
    //   },
    // };
    const { data } = await axios.put(`${BASE_URL}/order/status/update/${id}`);
    dispatch({
      type: ORDER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_UPDATE_FAIL,
      // payload:error.response && error.response.data.msg
      payload: error.response && error.response.data,
    });
  }
};

export const getMyListOrder = (userId) => async (dispatch, getState) => {
  try {
    console.log(userId)
    dispatch({ type: ORDER_LIST_REQUEST });
    //  const userLogin = getState().loginData.userInfo;
    // const config = {
    //   headers: {
    //     Authorization: userInfo.token,
    //   },
    // };
    const { data } = await axios.get(`${BASE_URL}/order/of/${userId}`);
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: error.response && error.response.data,
    });
  }
};


export const getAllListOrder = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_ALL_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: userInfo.token,
      },
    };
    const { data } = await axios.get(`/api/orders/list`, config);
    dispatch({
      type: ORDER_LIST_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_ALL_FAIL,
      // payload:error.response && error.response.data.msg
      payload: error.response && error.response.data.msg,
    });
  }
};

export const deliveredOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: userInfo.token,
      },
    };
    const { data } = await axios.put(`/api/orders/${order._id}/delivered`, {}, config);
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      // payload:error.response && error.response.data.msg
      payload: error.response && error.response.data.msg,
    });
  }
};