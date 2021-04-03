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
  USER_UPDATE_RESET
} from '../constants/userConstants';
import {BASE_URL} from '../constants/URL_SERVER';

// const fetchUsersSuccess = users => ({
//   type: FETCH_USERSS_SUCCESS,
//   payload: users
// });

export const listUsers = () => async(dispatch) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const {data} = await axios.get(`${BASE_URL}/users`);
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

export const login = (username, password) => async(dispatch) => {
 
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const {data} = await axios.post(`${BASE_URL}/user/login`, {username, password}, config);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('users', JSON.stringify(data));
  } catch (error) {
    // document.write("ls")
    // dispatch({
    //   type: USER_LOGIN_FAIL,
    //  // payload: error.response && error.response.data.msg,
    //   payload: [],
    // });
  }
};

export const register = (username, password, email) => async(dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const {data} = await axios.post(`${BASE_URL}/user/register`, {username, password, email});
    //document.write(data)
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // document.write("ls")
    // dispatch({
    //   type: USER_REGISTER_FAIL,
    //  // payload: error.response && error.response.data.msg,
    //   payload: [],
    // });
  }
};

export const getDetail=(userInfo) => async (dispatch,getState)=>{
  try {
    dispatch({type:USER_DETAILS_REQUEST});
    const {data} = await axios.get(`${BASE_URL}/user/${userInfo.id}`)
    dispatch({
      type:USER_DETAILS_SUCCESS,
      payload:data
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.msg,
    });
  }
}

export const updateProfile=(newInfo, userLogin)=>async (dispatch)=>{
  console.log(userLogin)
  try {
    
    dispatch({type:USER_UPDATE_PROFILE_REQUEST});
    
    //const {loginData:{userInfo}}=getState()
    // const config={
    //   headers:{
    //     'Authorization':userInfo.token
    //   }
    // }
    
    const {data}= await axios.put( `${BASE_URL}/user/update/${userLogin.id}`, newInfo)
    dispatch({type:USER_UPDATE_PROFILE_SUCCESS})
  } catch (error) {
    dispatch({type:USER_UPDATE_PROFILE_FAIL,payload:error.response && error.response.data.msg})
  }
}

export const updatePassword=(newInfoPassword, userLogin)=>async (dispatch)=>{
  console.log(userLogin)
  try {
    
    dispatch({type:USER_UPDATE_PROFILE_REQUEST});
    
    //const {loginData:{userInfo}}=getState()
    // const config={
    //   headers:{
    //     'Authorization':userInfo.token
    //   }
    // }
    
    const {data}= await axios.put( `${BASE_URL}/user/update/password/${userLogin.id}`, newInfoPassword)
    dispatch({type:USER_UPDATE_PROFILE_SUCCESS})
  } catch (error) {
    dispatch({type:USER_UPDATE_PROFILE_FAIL,payload:error.response && error.response.data.msg})
  }
}
