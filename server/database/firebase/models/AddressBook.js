import firebase from "../index";

const db = firebase.ref("/addressbook");

class AddressBook {
  create(contact) {
    return db.push(contact);
  }
}

export default new AddressBook();