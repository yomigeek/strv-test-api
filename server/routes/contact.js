import {Router} from "express";
import ContactValidation from "./../middlewares/validations/ContactValidation";
import Token from "./../utils/Token";
import ContactController from "./../controllers/ContactController";

const contactRouter = Router();

contactRouter.post(
  "/add",
  Token.verifyToken,
  ContactValidation.validateContactData,
  ContactController.addContact
);

export default contactRouter;
