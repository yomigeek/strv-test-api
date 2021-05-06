import AddressBook from "../database/firebase/models/AddressBook";
import MessagesHandler from "./../utils/MessagesHandler";

class ContactController {
  static addContact(req, res) {
    const {firstName, lastName, phone, address} = req.body;
    const data = {
      firstName,
      lastName,
      phone,
      address,
    };

    AddressBook.create(data)
      .then(() => {
        return MessagesHandler.successMessage(
          res,
          201,
          "Contact created successfully"
        );
      })
      .catch((e) => {
        console.log(e, "error");
        return MessagesHandler.errorMessage(
          res,
          500,
          "failure to perform operation"
        );
      });
  }
}

export default ContactController;
