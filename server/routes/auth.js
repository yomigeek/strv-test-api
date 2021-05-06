import {Router} from "express";
import AuthController from "../controllers/AuthController";
import CheckConflicts from "./../middlewares/CheckConflicts";
import AuthValidation from "./../middlewares/validations/AuthValidation";

const authRouter = Router();

authRouter.post(
  "/login",
  AuthValidation.validateUserDetail,
  AuthController.userLogin
);

authRouter.post(
  "/signup",
  AuthValidation.validateUserDetail,
  CheckConflicts.existingUser,
  AuthController.userSignUp
);

export default authRouter;
