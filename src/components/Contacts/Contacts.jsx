import React from 'react';
import PropTypes from 'prop-types';
import css from './Contacts.module.css';
import ContactListItem from './ContactListItem/ContactListItem';

const Contacts = ({ actualContacts, deleteContact }) => {
  return (
    <div className={css.contactsContainer}>
      <ul className={css.contactsList}>
        {actualContacts.map(contact => (
          <ContactListItem
            key={contact.id}
            contact={contact}
            onDelete={deleteContact}
          />
        ))}
      </ul>
    </div>
  );
};

Contacts.propTypes = {
  actualContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
export default Contacts;
