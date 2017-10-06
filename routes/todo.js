'use strict';

const express        = require('express');

//const todoController    = require('../controllers/todo');

var router = express.Router();

router.get("/", function(req, resp){
    resp.send("main for todo");
});

module.exports = router;
