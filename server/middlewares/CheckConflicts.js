import connect from "../database/connect";
import MessagesHandler from "./../utils/MessagesHandler";
import Validator from "validatorjs";

class CheckConflicts {
  static validateUserDetail(req, res, next) {
    const {password, email} = req.body;

    if (!password || !email) {
      return MessagesHandler.errorMessage(
        res,
        400,
        "Email and password are required"
      );
    }
    if (password.length < 6) {
      return MessagesHandler.errorMessage(
        res,
        400,
        "Password cannot be less than 6 characters"
      );
    }

    const regEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email);

    if (!regEmail) {
      return MessagesHandler.errorMessage(res, 400, "Email address is invalid");
    }

    next();
  }

  static validateLoginDetail(req, res, next) {
    const {email, password} = req.body;
    if (!password || !email) {
      return MessagesHandler.errorMessage(
        res,
        400,
        "Email and password are required"
      );
    }

    const regEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email);

    if (!regEmail) {
      return MessagesHandler.errorMessage(res, 400, "Email address is invalid");
    }

    next();
  }

  static existingUser(req, res, next) {
    const {email} = req.body;
    connect.query(
      `SELECT email FROM users WHERE email='${email}'`,
      (err, response) => {
        const result = JSON.parse(JSON.stringify(response.rows));
        if (result.length > 0) {
          return MessagesHandler.errorMessage(
            res,
            409,
            "Email address already exist"
          );
        }
        next();
      }
    );
  }

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

    if (validation.fails()) {
      return MessagesHandler.errorMessage(
        res,
        400,
        "Validation failed",
        validation.errors.all()
      );
    } else {
      next();
    }
  }
}

export default CheckConflicts;
