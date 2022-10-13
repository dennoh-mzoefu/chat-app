const router = require("express").Router();
const chatController = require("../controllers/chatController.js");

router.get("/", chatController.getChats);
router.post("/save", chatController.saveChats);

module.exports = router;
