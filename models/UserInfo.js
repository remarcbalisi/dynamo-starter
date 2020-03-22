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
