import {
  ADD_CONTACT,
  ADD_FILTER,
  ADD_NAME,
  ADD_NUMBER,
  CLEAN_FORM,
  CONTACTS_FROM_STORAGE,
  DELL_CONTACT,
} from './type';

export const getStorage = story => ({
  type: CONTACTS_FROM_STORAGE,
  payload: JSON.parse(story),
});
export const getFilterValue = e => ({
  type: ADD_FILTER,
  payload: e.target.value,
});
export const addContact = obj => ({
  type: ADD_CONTACT,
  payload: obj,
});
export const dellContact = e => ({
  type: DELL_CONTACT,
  payload: e.target.id,
});
export const addName = value => ({ type: ADD_NAME, payload: value });
export const addNumber = value => ({ type: ADD_NUMBER, payload: value });
export const cleanForm = () => ({ type: CLEAN_FORM });
