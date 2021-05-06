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

export const income = (state = { money: [] }, action) => {
  switch (action.type) {
    case REPORT_INCOME_REQUEST:
      return { ...state, loading: true };
    case REPORT_INCOME_SUCCESS:
      return { loading: false, money: action.payload };
    case REPORT_INCOME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const numOfUser = (state = { money: [] }, action) => {
  switch (action.type) {
    case REPORT_NUM_USER_REQUEST:
      return { ...state, loading: true };
    case REPORT_NUM_USER_SUCCESS:
      return { loading: false, number: action.payload };
    case REPORT_NUM_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const numOfProduct = (state = { sum: [] }, action) => {
  switch (action.type) {
    case REPORT_NUM_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case REPORT_NUM_PRODUCT_SUCCESS:
      return { loading: false, sum: action.payload };
    case REPORT_NUM_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const numOfBlog = (state = { sum: [] }, action) => {
  switch (action.type) {
    case REPORT_NUM_BLOG_REQUEST:
      return { ...state, loading: true };
    case REPORT_NUM_BLOG_SUCCESS:
      return { loading: false, sum: action.payload };
    case REPORT_NUM_BLOG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const numOfOrder = (state = { number: [] }, action) => {
  switch (action.type) {
    case REPORT_NUM_ORDER_REQUEST:
      return { ...state, loading: true };
    case REPORT_NUM_ORDER_SUCCESS:
      return { loading: false, number: action.payload };
    case REPORT_NUM_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};