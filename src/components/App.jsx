import { useEffect, useState } from 'react';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contactsJSON = localStorage.getItem('contacts');
    if (contactsJSON) {
      return JSON.parse(contactsJSON);
    } else {
      return [];
    }
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsJSON = JSON.stringify(contacts);

    localStorage.setItem('contacts', contactsJSON);
  }, [contacts]);

  const handleChange = event => {
    const { value } = event.target;

    setFilter(value);
  };

  const addNewContact = newContact => {
    if (contacts.find(contact => contact.name === newContact.name)) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    setContacts([...contacts, newContact]);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(item => item.id !== id));
  };

  return (
    <>
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>Phonebook</h1>
      <ContactForm callback={addNewContact} />
      <h2 style={{ display: 'flex', justifyContent: 'center' }}>Contacts</h2>
      <Filter filter={filter} handleChange={handleChange}></Filter>
      <Contacts
        contacts={contacts}
        filter={filter}
        deleteContact={deleteContact}
      ></Contacts>
    </>
  );
};

export default App;
