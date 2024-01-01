import { useEffect, useRef } from 'react';
import { FormAddContacts } from './Form/Form';
import { nanoid } from 'nanoid';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContact,
  cleanForm,
  dellContact,
  getFilterValue,
  getStorage,
} from 'store/action';

export const App = () => {
  const contacts = useSelector(state => state.contact.contacts);
  const filter = useSelector(state => state.contact.filter);
  const name = useSelector(state => state.form.name);
  const number = useSelector(state => state.form.number);

  const firstRender = useRef(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      dispatch(getStorage(storedContacts));
    }
  }, [dispatch]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = () => {
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    const isContact = contacts.some(
      obj =>
        obj.name.trim().toLowerCase() === newContact.name.trim().toLowerCase()
    );
    if (isContact) {
      swal({
        title: newContact.name,
        text: 'Is already in contacts!',
        icon: 'info',
      });
      dispatch(cleanForm());
      return;
    }
    dispatch(addContact(newContact));
    dispatch(cleanForm());
  };

  const handleChange = e => {
    dispatch(getFilterValue(e));
  };

  const handleDeleteContact = e => {
    dispatch(dellContact(e));
  };

  const arreyContactsFiltered = () =>
    contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.trim().toLowerCase())
    );

  return (
    <div className="maine_box">
      <h1 className="h1 mt-2">Phonebook</h1>
      <FormAddContacts handleAddContact={handleAddContact} />
      <h2 className="h2 mt-3">Contacts</h2>
      <Filter state={filter} handleChange={handleChange} />
      <ContactsList
        array={arreyContactsFiltered()}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
};
