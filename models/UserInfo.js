import bcrypt from "bcrypt";
import {docClient} from "~conf/awsConfig";
import User from "~mod/User"
import {createParam} from "~help/param";

const table = "User";

class UserInfo extends User {

  constructor({email, password}) {
    const dateStr = new Date().toISOString();
    super({created_at: dateStr});
    this.email = email;
    this.password = password
  }

  async create() {

    this.setPassword(await bcrypt.hash(this.password, 10));

    const item = {
      "id": this.id,
      "created_at": this.created_at,
      "user": {
        "email": this.email,
        "password": this.password
      }
    };

    try {
      const data  = await docClient.put(createParam({
        table: table,
        rest: item
      })).promise();
      return this.getUser();

    } catch(err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    }
  }

  static async findOne({payload, filter}) {

    let projectionExpression = '';
    let projectionExpressionElements = [];
    let expressionAttributeNames = {};
    let expressionAttributeValues = {};

    for(const key in payload) {
      let splitCondition = key.split('.');
      projectionExpressionElements.push(`#${key}`);
      expressionAttributeNames[`#${splitCondition[0]}`] = splitCondition[0];
      expressionAttributeValues[`:${splitCondition[splitCondition.length - 1]}`] = payload[key];
    }
    projectionExpression = projectionExpressionElements.join(', ');

    const params = {
      TableName: "User",
      ProjectionExpression: projectionExpression,
      FilterExpression: filter,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues
    };

    console.log("Scanning User table.");

    try {
      const data = await docClient.scan(params).promise();
      console.table(data);
      if (typeof data.LastEvaluatedKey != "undefined") {
        console.log("Scanning for more...");
        params.ExclusiveStartKey = data.LastEvaluatedKey;
        const moreData = docClient.scan(params).promise();
        console.table(moreData);
      }
    } catch(err) {
      console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    }
  }

  setEmail(newEmail) {
    this.email = newEmail;
  }

  setPassword(newPassword) {
    this.password = newPassword;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  getUser() {
    return {
      email: this.id,
      user: {
        id: this.id,
        created_at: this.created_at,
      }
    };
  }
}

export default UserInfo;
