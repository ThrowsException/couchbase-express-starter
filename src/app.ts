import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { connect } from "./db";

// var indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

export const app = express();

console.log(`${process.env.COUCHBASE_URL}`);

connect(`${process.env.COUCHBASE_URL}`, {
  username: process.env.COUCHBASE_USER,
  password: process.env.COUCHBASE_PASSWORD,
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/users", usersRouter);
