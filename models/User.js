import {v4 as uuidv4} from "uuid";

class User {

  constructor({created_at}) {
    this.id = uuidv4();
    this.created_at = created_at;
  }

  getCreated_at() {
    return this.created_at;
  }

  setCreated_at(newCreatedAt) {
    this.created_at = newCreatedAt;
  }
}

export default User;
