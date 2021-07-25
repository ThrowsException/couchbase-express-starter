import express from "express";
import { get, insert } from "../db";
import { wrap as w } from "./wrap";

let router = express.Router();

type User = {
  name: string;
};

router.get(
  "/:id",
  w(async (req, res) => {
    const user = await get<User>(`user::${req.params.id}`);
    res.json(user);
  })
);

/* GET users listing. */
router.post(
  "/:id",
  w(async (req, res) => {
    const result = await insert<User>(`user::${req.params.id}`, req.body);
    res.json(result.name);
  })
);

module.exports = router;
