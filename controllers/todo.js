/*
http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-examples-using-tables.html
*/

'use strict';

var todoController;

exports.readAll = function(){

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

    var params = {
        TableName: 'todo',
        Item: {
          'Task' : {N: 'Task 1'},
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
