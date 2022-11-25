/* eslint-disable no-unused-vars */
import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
  const api_version = "http://localhost:5000/api/v0";
  const initialState = {
    token: localStorage.getItem("token"),
    user: null,
    isAuthenticated: null,
    loading: true,
    error: null,
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  /**
   * State - allows to access anything in our state
   * dispatch - Dispatch objects to the reducer
   */
  const [state, dispatch] = useReducer(authReducer, initialState);

  /**
   * Actions we are having
   */
  // Load User

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      const res = await axios.get(`${api_version}/auth`, config);
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
      /** @TODO Test the response object here, for proper processing */
      console.log("User loaded successfuly" + res);
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };
  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    try {
      const res = await axios.post(`${api_version}/users`, formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data /**TOKEN from backend */,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.error /**ERROR from backend */,
      });
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      const res = await axios.post(`${api_version}/auth`, formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data /**TOKEN from backend */,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.error /**ERROR from backend */,
      });
    }
  };
  // LogOut
  const logout = () => {
    dispatch({ type: LOGOUT });
  };
  // Clear Errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };
  return (
    // {/* What we access from other states | Providing method to our state*/}
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        loading: state.loading,
        user: state.user,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
