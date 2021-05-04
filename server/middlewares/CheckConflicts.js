import connect from "../database/connect";
import MessagesHandler from "./../utils/MessagesHandler";

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
}

export default CheckConflicts;
