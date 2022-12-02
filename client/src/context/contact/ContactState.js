/* eslint-disable no-unused-vars */
import React, { useReducer } from "react";
import axios from "axios";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS,
} from "../types";

const ContactState = (props) => {
  const api_version = "http://localhost:5000/api/v0";
  const initialState = {
    contacts: null,
    current: null, // when edit is clicked this wil contain a value.
    filtered: null,
    error: null,
  };
  /**
   * State - allows to access anything in our state
   * dispatch - Dispatch objects to the reducer
   */
  const [state, dispatch] = useReducer(contactReducer, initialState);
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  /**
   * Actions we are having
   */
  // Get Contacts
  const getContacts = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      const res = await axios.get(`${api_version}/contacts`, config);
      dispatch({
        type: GET_CONTACTS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg,
      });
    }
  };
  // add
  const addContact = async (contact) => {
    // contact.id = uuidv4();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    try {
      console.info(localStorage.getItem("token"));
      const res = await axios.post(`${api_version}/contacts`, contact, config);
      dispatch({
        type: ADD_CONTACT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg,
      });
    }
  };
  // Delete
  const deleteContact = async (id) => {
    try {
      await axios.delete(`${api_version}/contacts/${id}`, config);

      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };
  // Clear Contact
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  }; //Set Current
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  // Clear Current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  // Update Contact
  const updateContact = async (contact) => {
    try {
      const res = await axios.put(
        `${api_version}/contacts/${contact._id}`,
        contact,
        config
      );

      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };
  // Filter Contact
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    // {/* What we access from other states | Providing method to our state*/}
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getContacts,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        clearContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
