import connect from "../database/connect";
import {v4 as uuidv4} from "uuid";
import bcrypt from "bcryptjs";
import Token from "./../utils/Token";
import ErrorMessages from './../utils/ErrorMessages';

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
          return res.status(500).json({
            status: "error",
            statusCode: 500,
            message: "fail",
          });
        }

        const result = JSON.parse(JSON.stringify(response.rows));

        if (result) {
          return res.status(201).json({
            status: "success",
            statusCode: 201,
            message: "signup successful",
          });
        } else {
          return res.status(400).json({
            status: "error",
            statusCode: 400,
            message: "fail",
          });
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
            return res.status(200).json({
              status: "success",
              statusCode: 200,
              message: "login successful",
              token,
            });
          } else {
            return res.status(400).json({
              status: "error",
              statusCode: 400,
              message: "Email or Password is wrong",
            });
          }
        } else {
          return res.status(400).json({
            status: "error",
            statusCode: 400,
            message: "Email or Password is wrong",
          });
        }
      }
    );
  }
}

export default AuthController;
