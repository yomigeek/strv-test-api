import {Router} from "express";
import CheckConflicts from "./../middlewares/CheckConflicts";
import Token from "./../utils/Token";
import ContactController from "./../controllers/ContactController";

const contactRouter = Router();

contactRouter.post(
  "/add",
  Token.verifyToken,
  CheckConflicts.validateContactData,
  ContactController.addContact
);

export default contactRouter;
