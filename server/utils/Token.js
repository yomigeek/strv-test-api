import jwt from "jsonwebtoken";
import MessagesHandler from "./MessagesHandler";

require('dotenv').config({path: '../.env'});

class Token {
  /**
   * @description Method to generate token
   *
   * @param {Object} tokenData
   *
   * @return {String} Returned token
   */

  
  static generateToken(tokenData) {
    return jwt.sign(tokenData, process.env.SECRET, {
      expiresIn: tokenData.expiryTime,
    });
  }

  static verifyToken(req, res, next) {
    const token = req.body.token || req.headers["x-access-token"];
    if (token) {
      jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) {
          return MessagesHandler.errorMessage(res, 401, "Unauthorized. Login first");
        }
        req.decoded = decoded;
        return next();
      });
    } else {
      return MessagesHandler.errorMessage(res, 401, "Unauthorized. Login first");
    }
  }
}

export default Token;
