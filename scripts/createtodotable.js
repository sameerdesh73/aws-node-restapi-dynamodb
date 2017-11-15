/*
http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.01.html
http://docs.aws.amazon.com/cli/latest/reference/dynamodb/index.html#cli-aws-dynamodb

*/

console.log('No value for Port yet:', process.env.PORT);
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
console.log('Now the value for Port is:', process.env.PORT);
console.log('Value for AWS_REGION is:', process.env.AWS_REGION);
console.log('Value for AWS_ENDPOINT is:', process.env.AWS_ENDPOINT);

var AWS = require("aws-sdk");

AWS.config.update({
  region: process.env.AWS_REGION, // "us-west-2",
  endpoint: process.env.AWS_ENDPOINT //"http://localhost:8000"
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