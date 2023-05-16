import express from "express";
import {
  getBooksById,
  getBooks,
  postBooks,
} from "../controller/bookController.js";

const router = express.Router();

router.route("/").get(getBooks);

router.route("/:id").get(getBooksById);

router.route("/").post(postBooks);

export default router;
