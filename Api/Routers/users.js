const express = require("express");
const checkAuth = require("../Auth/checkAuth");
const router = express.Router();



const { getAllUsers, signIn, signUp, Updateusers, deleteUser } = require("../controllers/users");
router.post('/', checkAuth, getAllUsers);
router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.post('/delete', checkAuth, deleteUser);
router.post('/Update', checkAuth, Updateusers);
module.exports = router;
