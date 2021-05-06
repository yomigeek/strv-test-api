import firebase from "../index";
import collection from "./connectCollection";

require("dotenv").config({path: "../.env"});

const db = firebase.ref(`/${collection}`);

class AddressBook {
  create(contact) {
    return db.push(contact);
  }
}

export default new AddressBook();