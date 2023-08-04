import css from '../Contacts.module.css';
import PropTypes from 'prop-types';

const ContactListItem = ({ contact, onDelete }) => {
  return (
    <li className={css.contactItem}>
      <div className={css.contactWrapper}>
        <span className={css.contactName}>
          {contact.name} : {contact.number}
        </span>
        <button
          type="button"
          className={css.deleteBtn}
          onClick={() => onDelete(contact.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactListItem;
