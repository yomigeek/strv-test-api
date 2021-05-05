import firebase from "../index";

const db = firebase.ref("/addressbook");

class AddressBook {
  getAll() {
    return db;
  }

  create(contact) {
    return db.push(contact);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new AddressBook();