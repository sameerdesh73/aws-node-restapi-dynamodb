/*
http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-examples-using-tables.html
*/

'use strict';

var todoController;
const HttpStatusCode = require('http-status-codes');


exports.readAll = function(req, res, next){
    console.log('todoController.readall: Value for AWS_REGION is:', process.env.AWS_REGION);
    console.log('todoController.readall: Value for AWS_ENDPOINT is:', process.env.AWS_ENDPOINT);
    
    var AWS = require("aws-sdk");

    AWS.config.update({
        region: process.env.AWS_REGION, // "us-west-2",
        // endpoint: "http://localhost:8500" //uncomment this line to cause error condition
        endpoint: process.env.AWS_ENDPOINT //"http://localhost:8000"
    });

    var docClient = new AWS.DynamoDB.DocumentClient();
    
    console.log("todoController.readall: Querying all tasks that are not started yet");
    
    var params = {
        TableName: "todo",
        FilterExpression: "#status = :status",
        ExpressionAttributeNames:{
            "#status": "Status"
        },
        ExpressionAttributeValues: {
            ":status": "Not Started"
        }
    };
    
    docClient.scan(params, function(err, data) {
        if (err) {          
            console.log("todoController.readall: Scanning error - " + JSON.stringify(err, null, 2));
            return next(err);
        } else {
            console.log("todoController.readall: Success");
            console.log('Count: ' + data.Count);
            data.Items.forEach(function(item) {
                console.log(" -", item.Task + ": " + item.Status);
            });
            res.statusCode = HttpStatusCode.OK;
            res.json(data)
        }
    });  
};

exports.read = function(){
    
};

exports.create = function(req, res, next){
    //throw new Error('sameer try error');

    var taskname = req.body.taskname;

    var AWS = require("aws-sdk");

    AWS.config.update({
        region: process.env.AWS_REGION, // "us-west-2",
        endpoint: process.env.AWS_ENDPOINT //"http://localhost:8000"
    });

    var dynamodb = new AWS.DynamoDB();

    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var dtformatted =  dt.format('Y-m-d H:M:S'); //'2017-11-14 17:03:43'

    var params = {
        TableName: 'todo',
        Item: {
            'Task' : {S: taskname + ' ' + dtformatted},
            'Status' : {S: 'Not Started'},
            }
        };
        
    // Call DynamoDB to add the item to the table
    dynamodb.putItem(params, function(err, data) {
        if (err) {
            console.log("todoController.create: Error creating item - " + JSON.stringify(err, null, 2));
            return next(err);
        } else {
            console.log("Success", data);
            res.statusCode = HttpStatusCode.CREATED;
            res.json(data)
        }
    });
};
    
exports.update = function(){
        
};

exports.delete = function(){
    
};
