import express from "express";
// import { get } from "../db";
import { wrap as w } from "./wrap";

let router = express.Router();

type User = {
  name: string;
};

/* GET users listing. */
router.get(
  "/:id",
  w(async (req, res, next) => {
    // const user = await get<User>(req.params.id);
    res.json({ message: "hello world" });
  })
);

/* GET users listing. */
router.post(
  "/:id",
  w(async (req, res, next) => {
    res.json({ message: "goodbye world" });
  })
);

module.exports = router;
