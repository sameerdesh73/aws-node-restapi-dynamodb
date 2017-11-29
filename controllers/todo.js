/*
http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-examples-using-tables.html
*/

'use strict';

var todoController;

exports.readAll = function(callback){
    try
    {

        console.log('Inside Readall - Value for AWS_REGION is:', process.env.AWS_REGION);
        console.log('Inside Readall - Value for AWS_ENDPOINT is:', process.env.AWS_ENDPOINT);
        
        var AWS = require("aws-sdk");
    
        AWS.config.update({
            region: process.env.AWS_REGION, // "us-west-2",
            // endpoint: "http://localhost:8500" //uncomment this line to cause error condition
            endpoint: process.env.AWS_ENDPOINT //"http://localhost:8000"
        });

        var docClient = new AWS.DynamoDB.DocumentClient();
        
        console.log("Querying all tasks that are not started yet");
        
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
                var errorText = JSON.stringify(err, null, 2);
                console.error("Unable to query. Error:", errorText);
                return callback(new Error(errorText));
            } else {
                console.log("Query succeeded.");
                console.log('Count: ' + data.Count);
                data.Items.forEach(function(item) {
                    console.log(" -", item.Task + ": " + item.Status);
                });
                return callback(null, data);
            }
        });  
    }
    catch(err)
    {
        var errorText = JSON.stringify(err, null, 2);
        console.error("Unknown Error. Error:", errorText);
        return callback(new Error(errorText));
    }
};

exports.read = function(){
    
};

exports.create = function(){

    var AWS = require("aws-sdk");
    
    AWS.config.update({
      region: "us-west-2",
      endpoint: "http://localhost:8000"
    });
    
    var dynamodb = new AWS.DynamoDB();

    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var dtformatted = dt.format('Y-m-d H:M:S');

    var params = {
        TableName: 'todo',
        Item: {
          'Task' : {S: 'Task 1 ' + dtformatted},
          'Status' : {S: 'Not Started'},
        }
      };
      
      // Call DynamoDB to add the item to the table
      dynamodb.putItem(params, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data);
        }
      });
    
};
    
exports.update = function(){
        
};

exports.delete = function(){
    
};
