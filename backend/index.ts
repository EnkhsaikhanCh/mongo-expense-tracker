import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./database/connectDB";
import usersRouter from "./routers/usersRouters";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

// User routes
app.use("/users", usersRouter);

// Connect to the database
connectDB();

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
