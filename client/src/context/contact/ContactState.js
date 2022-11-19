/* eslint-disable no-unused-vars */
import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  DELETE_CONTACT,
  FILTER_CONTACTS,
  SET_CURRENT,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Jill John",
        email: "jill@email.com",
        phone: "111-111-111",
        type: "personal",
      },
      {
        id: 2,
        name: "Mary Jane",
        email: "may@email.com",
        phone: "111-111-111",
        type: "personal",
      },
      {
        id: 3,
        name: "Harry White",
        email: "harry@email.com",
        phone: "291-231-111",
        type: "professional",
      },
    ],
  };
  /**
   * State - allows to access anything in our state
   * dispatch - Dispatch objects to the reducer
   */
  const [state, dispatch] = useReducer(contactReducer, initialState);

  /**
   * Actions we are having
   */
  // add
  const addContact = (contact) => {
    contact.id = uuidv4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };
  // Delete
  //Set Current
  // Clear Current
  // Update Contact
  // Filter Contact
  // Clear Filter

  return (
    // {/* What we access from other states */}
    <ContactContext.Provider value={{ contacts: state.contacts, addContact }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
