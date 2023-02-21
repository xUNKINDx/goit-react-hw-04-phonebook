import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

const ContactForm = props => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
        default:
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const { callback } = props;

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    callback(newContact);

    setName('');
    setNumber('');
  };

  return (
    <>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto',
        }}
        onSubmit={handleSubmit}
      >
        <label>Name</label>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
        />
        <label>Number</label>
        <input
          onChange={handleChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
        />
        <button
          style={{ width: '140px', margin: '20px auto', padding: '8px' }}
          type="submit"
          name="addContact"
        >
          Add contact
        </button>
      </form>
    </>
  );
};

ContactForm.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default ContactForm;
