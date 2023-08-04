import React, { useEffect, useState } from 'react';
import Form from './Form/Form';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';

import css from './App.module.css';

const LS_KEY = 'contact_book';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const isContactInList = name => {
    const normalizedName = name.trim().toLowerCase();

    return contacts.some(
      contact => contact.name.toLowerCase() === normalizedName
    );
  };

  const addContact = newContact => {
    if (isContactInList(newContact.name)) {
      alert('This contact already exists!');
    } else {
      setContacts(prevContacts => [...prevContacts, newContact]);
    }
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem(LS_KEY));
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const filteredContacts = getFilteredContacts();
  return (
    <>
      <div className={css.appContainer}>
        <h1 className={css.appTitle}>Phonebook</h1>
        <Form addContact={addContact} isContactInList={isContactInList} />
        <h2 className={css.contactsTitle}>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <Contacts
          actualContacts={filteredContacts}
          deleteContact={deleteContact}
        />
      </div>
    </>
  );
}
