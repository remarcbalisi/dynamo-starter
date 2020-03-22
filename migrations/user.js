import AWS from 'aws-sdk';

AWS.config.update({
  region: "us-east-2",
});

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName : "User",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH"},  //Partition key
    { AttributeName: "created_at", KeyType: "RANGE" }  //Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" },
    { AttributeName: "created_at", AttributeType: "S" }
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
