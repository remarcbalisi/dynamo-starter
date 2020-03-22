import UserInfo from "~mod/UserInfo";

export default {
  createUser: async ({userInfoInput}) => {
    const user = new UserInfo(userInfoInput);
    const newUser = await user.create();
    return newUser;
  }
}
