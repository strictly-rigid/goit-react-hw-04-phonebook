import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './Form.module.css';

export default function Form({ addContact, isContactInList }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [isContactInListState, setIsContactInListState] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  useEffect(() => {
    const normalizedName = name.trim().toLowerCase();
    setIsContactInListState(isContactInList(normalizedName));
  }, [name, isContactInList]);

  const handleSubmit = event => {
    event.preventDefault();

    if (isContactInListState) {
      alert('This contact already exists!');
    } else {
      const newContact = {
        id: nanoid(),
        name: name.trim(),
        number: number.trim(),
      };
      addContact(newContact);
      setName('');
      setNumber('');
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.formLabel} htmlFor="name">
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={css.formLabel} htmlFor="number">
        Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={css.formButton}>
        Add contact
      </button>
    </form>
  );
}

Form.propTypes = {
  addContact: PropTypes.func.isRequired,
  isContactInList: PropTypes.func.isRequired,
};
