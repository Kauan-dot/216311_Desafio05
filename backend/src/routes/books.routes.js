const express = require("express");
const router = express.Router();
const controller = require("../controllers/books.controller");

router.get("/", controller.getBooks);
router.get("/:id", controller.getBookById);
router.post("/", controller.createBook);
router.put("/:id", controller.updateBook);
router.delete("/:id", controller.deleteBook);

module.exports = router;
