import firebase from "../index";

require("dotenv").config({path: "../.env"});

const db = firebase.ref(`/${process.env.FBASE_DB_NAME}`);

class AddressBook {
  create(contact) {
    return db.push(contact);
  }
}

export default new AddressBook();