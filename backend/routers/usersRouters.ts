import express from "express";
import { createUser, getUsers } from "../controllers/usersControllers";
import { validateUser } from "../middleware/userValidation";

const usersRouter = express.Router();

usersRouter.post("/register", validateUser, createUser);
usersRouter.get("/allUsers", validateUser, getUsers);

export default usersRouter;
