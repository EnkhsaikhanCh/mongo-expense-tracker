import express from "express";
import { createUser } from "../controllers/usersControllers";
import { validateUser } from "../middleware/userValidation";

const usersRouter = express.Router();

usersRouter.post("/register", validateUser, createUser);

export default usersRouter;
