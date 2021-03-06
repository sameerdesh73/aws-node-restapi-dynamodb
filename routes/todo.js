/*
Reference: https://medium.com/@jeffandersen/building-a-node-js-rest-api-with-express-46b0901f29b6


*/

'use strict';

const express        = require('express');
const HttpStatusCode = require('http-status-codes');
const todoController = require("../controllers/todo");
const todoValidator = require("../validatior/todo");

// Create the express router object for todos
var todoRouter = express.Router();

// A GET to the root of a resource returns a list of that resource
todoRouter.get("/", todoController.readAll);

// A POST to the root of a resource should create a new object
todoRouter.post("/", todoValidator.create, todoController.create);

// We specify a param in our path for the GET of a specific object
todoRouter.get("/:id", function(req, res) { 
    todoController.read();
    res.HttpStatus = HttpStatusCode.OK;
    res.send("todo: get one")
});

// Similar to the GET on an object, to update it we can PATCH
todoRouter.patch("/:id", function(req, res) { 
    todoController.update();
    res.HttpStatus = HttpStatusCode.OK;
    res.send("todo: update one");
});

// Delete a specific object
todoRouter.delete('/:id', function(req, res) { 
    todoController.delete();
    res.HttpStatus = HttpStatusCode.delete;
    res.send("todo:  delete one");
});

module.exports = todoRouter;
