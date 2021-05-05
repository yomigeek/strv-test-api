import MessagesHandler from "../../utils/MessagesHandler";
import Validator from "validatorjs";

class ContactValidation {
  static validateContactData(req, res, next) {
    const {firstName, lastName, phone, address} = req.body;

    let data = {
      firstname: firstName,
      lastname: lastName,
      phone,
      address,
    };

    let rules = {
      firstname: "required|alpha|min:2",
      lastname: "required|alpha|min:2",
      phone: "required|min:11|max:15",
      address: "required|min:5",
    };

    let validation = new Validator(data, rules);

    validation.passes(() => next());
    validation.fails(() => {
      const errors = validation.errors.all();
      return MessagesHandler.errorMessage(
        res,
        400,
        "Validation failed",
        errors
      );
    });
  }
}

export default ContactValidation;
