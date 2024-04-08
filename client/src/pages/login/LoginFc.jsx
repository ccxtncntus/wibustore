import * as AccountService from '../../services/AccountService';
const logins = async (email, pass) => {
  try {
    const login = await AccountService.login(email, pass);
    if (login.status == 200) {
      return login;
    } else {
      return 'Sai tài khoản hoặc mật khẩu';
    }
  } catch (error) {
    throw error;
  }
};

export { logins };
