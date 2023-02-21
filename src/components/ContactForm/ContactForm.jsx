import { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

const initialState = {
  name: '',
  number: '',
};

class ContactForm extends Component {
  state = {
    ...initialState,
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState(prevState => {
      return { [name]: value };
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    
    const { callback } = this.props;
    const { name, number } = this.state;

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    callback(newContact);

    this.setState(prevState => {
      return { ...initialState };
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '0 auto',
          }}
          onSubmit={this.handleSubmit}
        >
          <label>Name</label>
          <input
            onChange={this.handleChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
          />
          <label>Number</label>
          <input
            onChange={this.handleChange}
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
  }
}

ContactForm.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default ContactForm;
