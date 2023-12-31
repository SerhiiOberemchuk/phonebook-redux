import { useState, useEffect } from 'react';
import { FormAddContacts } from './Form/Form';
import { nanoid } from 'nanoid';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import swal from 'sweetalert';

export const App = () => {
  const [contacts, setContacts] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    if (contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const handleAddContact = (contact, callbackCleanForm) => {
    const newContact = {
      id: nanoid(),
      name: contact.name,
      number: contact.number,
    };

    const isContact = (contacts || []).some(
      obj =>
        obj.name.trim().toLowerCase() === newContact.name.trim().toLowerCase()
    );

    if (isContact) {
      swal({
        title: newContact.name,
        text: 'Is already in contacts!',
        icon: 'info',
      });
      callbackCleanForm();
      return;
    }

    setContacts(prevState => [...prevState, newContact]);
    callbackCleanForm();
  };

  const handleChange = e => {
    setFilter(e.target.value);
  };

  const handleDeleteContact = e => {
    const idBtn = e.target.id;
    setContacts(contacts.filter(({ id }) => id !== idBtn));
  };

  const arreyContactsFiltered = () => {
    const array = contacts || [];
    return array.filter(({ name }) =>
      name.toLowerCase().includes(filter.trim().toLowerCase())
    );
  };

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
