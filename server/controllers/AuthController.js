import connect from "../database/connect";
import {v4 as uuidv4} from "uuid";
import bcrypt from "bcryptjs";
import Token from "./../utils/Token";
import MessagesHandler from "./../utils/MessagesHandler";

class AuthController {
  static userSignUp(req, res) {
    const userId = uuidv4();
    const {email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    connect.query(
      `INSERT INTO users (userid, email, password)
        VALUES ('${userId}', '${email}', '${hashedPassword}')
      `,
      (err, response) => {
        if (err) {
          return MessagesHandler.errorMessage(
            res,
            500,
            "failure to perform operation"
          );
        }

        const result = JSON.parse(JSON.stringify(response.rows));

        if (result) {
          return res.status(201).json({
            status: "success",
            statusCode: 201,
            message: "signup successful",
          });
        } else {
          return MessagesHandler.errorMessage(res, 400, "Signup failed");
        }
      }
    );
  }

  static userLogin(req, res) {
    const {email, password} = req.body;

    connect.query(
      `SELECT * FROM users WHERE email = '${email}'`,
      (err, response) => {
        const result = JSON.parse(JSON.stringify(response.rows));

        if (result.length > 0) {
          const checkPassword = bcrypt.compareSync(
            password,
            result[0].password
          );

          if (checkPassword) {
            const tokenData = {
              email,
              userId: result[0].userid,
              expiryTime: "500h",
            };
            const token = Token.generateToken(tokenData);
            return MessagesHandler.successMessage(res, 200, "Login success", {
              token,
            });
            // return res.status(200).json({
            //   status: "success",
            //   statusCode: 200,
            //   message: "login successful",
            //   token,
            // });
          } else {
            return MessagesHandler.errorMessage(
              res,
              400,
              "Email or password is wrong"
            );
          }
        } else {
          return MessagesHandler.errorMessage(
            res,
            400,
            "Email or password is wrong"
          );
        }
      }
    );
  }
}

export default AuthController;
