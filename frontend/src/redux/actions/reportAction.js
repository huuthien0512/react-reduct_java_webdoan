import axios from 'axios';

import {
  REPORT_INCOME_REQUEST,
  REPORT_INCOME_SUCCESS,
  REPORT_INCOME_FAIL,
  REPORT_NUM_USER_REQUEST,
  REPORT_NUM_USER_SUCCESS,
  REPORT_NUM_USER_FAIL,
  REPORT_NUM_PRODUCT_REQUEST,
  REPORT_NUM_PRODUCT_SUCCESS,
  REPORT_NUM_PRODUCT_FAIL,
  REPORT_NUM_BLOG_REQUEST,
  REPORT_NUM_BLOG_SUCCESS,
  REPORT_NUM_BLOG_FAIL,
  REPORT_NUM_ORDER_REQUEST,
  REPORT_NUM_ORDER_SUCCESS,
  REPORT_NUM_ORDER_FAIL
} from '../constants/reportConstants';
import { BASE_URL } from '../constants/URL_SERVER';

export const getIncome = () => async (dispatch) => {
  try {
    dispatch({ type: REPORT_INCOME_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/report/income/month`);
    dispatch({
      type: REPORT_INCOME_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REPORT_INCOME_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const getNumOfUser = () => async (dispatch) => {
  try {
    dispatch({ type: REPORT_NUM_USER_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/report/user/month`);
    dispatch({
      type: REPORT_NUM_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REPORT_NUM_USER_FAIL,
      payload: error.response && error.response.data
    });
  }
};

export const getNumOfProduct = () => async (dispatch) => {
  try {
    dispatch({ type: REPORT_NUM_PRODUCT_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/report/product/month`);
    dispatch({
      type: REPORT_NUM_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REPORT_NUM_PRODUCT_FAIL,
      payload: error.response && error.response.data
    });
  }
};

export const getNumOfBlog = () => async (dispatch) => {
  try {
    dispatch({ type: REPORT_NUM_BLOG_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/report/blog/month`);
    dispatch({
      type: REPORT_NUM_BLOG_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REPORT_NUM_BLOG_FAIL,
      payload: error.response && error.response.data
    });
  }
};

export const getNumOfOrder = () => async (dispatch) => {
  try {
    dispatch({ type: REPORT_NUM_ORDER_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/report/order/month`);
    dispatch({
      type: REPORT_NUM_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REPORT_NUM_ORDER_FAIL,
      payload: error.response && error.response.data
    });
  }
};