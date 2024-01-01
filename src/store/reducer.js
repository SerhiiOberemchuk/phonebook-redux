import { combineReducers } from 'redux';
import { initialState } from './initialState';
import {
  ADD_CONTACT,
  ADD_FILTER,
  ADD_NAME,
  ADD_NUMBER,
  CLEAN_FORM,
  CONTACTS_FROM_STORAGE,
  DELL_CONTACT,
} from './type';

const contactsReducer = (state = initialState.contact, action) => {
  switch (action.type) {
    case ADD_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case CONTACTS_FROM_STORAGE:
      return {
        ...state,
        contacts: action.payload,
      };
    case DELL_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(({ id }) => id !== action.payload),
      };

    default:
      return state;
  }
};

const formReducer = (state = initialState.form, action) => {
  switch (action.type) {
    case ADD_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case ADD_NUMBER:
      return {
        ...state,
        number: action.payload,
      };
    case CLEAN_FORM:
      return initialState.form;

    default:
      return state;
  }
};

export const reducer = combineReducers({
  contact: contactsReducer,
  form: formReducer,
});
