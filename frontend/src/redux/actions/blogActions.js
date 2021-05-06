import axios from 'axios';

import {
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOGS_FAIL,
  FETCH_BLOGS_REQUEST
} from '../constants/blogConstants'
import { BASE_URL } from '../constants/URL_SERVER';

export const listBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_BLOGS_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/blogs`);
    dispatch({
      type: FETCH_BLOGS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: FETCH_BLOGS_FAIL,
      // payload: error.response && error.response.data.msg,
      payload: [],
    });
  }
};