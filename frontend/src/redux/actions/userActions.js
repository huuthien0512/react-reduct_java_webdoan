import axios from 'axios';

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_FAIL,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PASSWORD_FAIL
} from '../constants/userConstants';
import { BASE_URL } from '../constants/URL_SERVER';

export const listUsers = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/users`);
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      // payload: error.response && error.response.data.msg,
      payload: [],
    });
  }
};

export const login = (username, password) => async (dispatch) => {

  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(`${BASE_URL}/user/login`, { username, password }, config);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.msg,
    });
  }
};

export const register = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const { data } = await axios.post(`${BASE_URL}/user/register`, userInfo);
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const getInfo = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/user/${id}`)
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data,
    });
  }
}

export const updateProfile = (newInfo, id) => async (dispatch) => {
  try {

    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    //const {loginData:{userInfo}}=getState()
    // const config={
    //   headers:{
    //     'Authorization':userInfo.token
    //   }
    // }
    console.log(newInfo)
    const { data } = await axios.put(`${BASE_URL}/user/update/${id}`, newInfo)
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS })
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: error.response && error.response.data.msg })
  }
}

export const updatePassword = (newInfoPassword, id) => async (dispatch) => {
  try {
    if (newInfoPassword.newPassword !== newInfoPassword.confirmNewPassword) {
      dispatch({ type: USER_UPDATE_PASSWORD_FAIL, payload: "Mật khẩu xác nhập không khớp" });
    } else {
      dispatch({ type: USER_UPDATE_PASSWORD_REQUEST });
      //const {loginData:{userInfo}}=getState()
      // const config={
      //   headers:{
      //     'Authorization':userInfo.token
      //   }
      // }

      const { data } = await axios.put(`${BASE_URL}/user/update/password/${id}`, newInfoPassword)
      dispatch({ type: USER_UPDATE_PASSWORD_SUCCESS, payload: data })
    }

  } catch (error) {
    dispatch({ type: USER_UPDATE_PASSWORD_FAIL, payload: error.response && error.response.data })
  }
}

export const updateProfileByAdmin = (newInfo, id) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });
    //const {loginData:{userInfo}}=getState()
    // const config={
    //   headers:{
    //     'Authorization':userInfo.token
    //   }
    // }
    const { data } = await axios.put(`${BASE_URL}/admin/update/${id}`, newInfo)
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.response && error.response.data })
  }
}


export const logout = () => async (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({
    type: USER_LIST_RESET
  });
  dispatch({
    type: USER_DELETE_RESET
  })

};
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });
    //const {userLogin:{userInfo}}=getState()
    // const config={
    //   headers:{
    //     'Authorization':userInfo.token
    //   }
    // }
    const { data } = await axios.delete(`${BASE_URL}/user/delete/${id}`)

    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response && error.response.data.msg,
    });
  }
}