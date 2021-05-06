import connect from "../database/connect";
import MessagesHandler from "./../utils/MessagesHandler";

class CheckConflicts {
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
