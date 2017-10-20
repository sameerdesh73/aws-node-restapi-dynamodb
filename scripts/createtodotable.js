/*
http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.01.html
http://docs.aws.amazon.com/cli/latest/reference/dynamodb/index.html#cli-aws-dynamodb

*/

var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "todo",
    AttributeDefinitions: [       
       { AttributeName: "Task", AttributeType: "S" },
        { AttributeName: "Status", AttributeType: "S" }
    ],
    KeySchema: [       
        { AttributeName: "Task", KeyType: "HASH"},  //Partition key
        { AttributeName: "Status", KeyType: "RANGE" }  //Sort key
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});