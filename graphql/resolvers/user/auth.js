import UserInfo from "~mod/UserInfo";

export default {
  createUser: async ({userInfoInput}) => {
    const user = new UserInfo(userInfoInput);
    const newUser = await user.create();
    return newUser;
  },
  login: async ({email, password}) => {
    const payload = {
      // 'user.email': 'await',
      'user.email': 'remarc.balisi@gmail.com',
      'id': '532822f0-aead-412a-ae9e-86fd1512526a'
    };
    const filter = '#user.email = :email or #id = :id';

    UserInfo.findOne({payload: payload, filter: filter});
  }
}
