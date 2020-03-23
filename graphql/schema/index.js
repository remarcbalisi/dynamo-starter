import {buildSchema} from "graphql";

export default buildSchema(`

  type UserInfo {
    email: String!
    password: String
    user: User!
  }
  
  type User {
    id: String!
    created_at: String
    info: UserInfo!
  }
  
  type AuthData {
    userId: String!
    token: String!
    tokenExpiration: Int!
  }
  
  input UserInfoInput {
    email: String!
    password: String!
  }
  
  type RootQuery {
    users: [String!]!
    login(email: String!, password: String!) : AuthData!
  }
  
  type RootMutation {
    createUser(userInfoInput: UserInfoInput): UserInfo
  }
  
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
