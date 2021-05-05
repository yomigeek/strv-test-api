import MessagesHandler from "../../utils/MessagesHandler";
import Validator from "validatorjs";

class AuthValidation {
  static validateUserDetail(req, res, next) {
    let rules = {
      email: "required|email",
      password: "required|min:6",
    };

    let validation = new Validator(req.body, rules);

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

export default AuthValidation;
