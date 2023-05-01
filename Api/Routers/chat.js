const express = require("express");
const router = express.Router();


const { getAllArticles, getChat, startChat, UpdateArticles, DeleteChat } = require("../controllers/articles");
router.get('/', getAllArticles)
router.post('/getChat', getChat)
router.post('/startChat', startChat)
router.patch('/:articleId', UpdateArticles)
router.delete('/', DeleteChat)
module.exports = router;
