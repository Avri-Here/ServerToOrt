const express = require("express");
const router = express.Router();

const { NewTask, deleteAll, getAllTask } = require("../controllers/Task");

router.post("/newTask", NewTask);
router.post("/deleteAll", deleteAll);
router.post("/getAllTask", getAllTask);


module.exports = router;
