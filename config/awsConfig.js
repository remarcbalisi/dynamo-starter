import AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-2",
});

export const docClient = new AWS.DynamoDB.DocumentClient();
