// Trong file logins.test.js

import * as AccountService from '../../services/AccountService';
import { logins } from './LoginFc';

jest.mock('../../services/AccountService', () => ({
  login: jest.fn(),
}));

describe('Hàm đăng nhập', () => {
  test('Đăng nhập thành công', async () => {
    const mockResponse = { status: 200, token: 'fakeToken' };
    AccountService.login.mockResolvedValueOnce(mockResponse);
    const result = await logins('ccxtncn00@gmail.com', 1);
    expect(AccountService.login).toHaveBeenCalledWith('ccxtncn00@gmail.com', 1);
    expect(result).toEqual(mockResponse);
  });

  test('Sai tài khoản hoặc mật khẩu', async () => {
    const mockResponse = { status: 400, mgs: 'Sai tài khoản hoặc mật khẩu' };
    AccountService.login.mockResolvedValueOnce(mockResponse);
    const result = await logins('ccxtncn00@gmail.com', 11);
    expect(AccountService.login).not.toHaveBeenCalledWith(
      'ccxtncn00@gmail.com',
      111
    );
    expect(result).toEqual('Sai tài khoản hoặc mật khẩu');
  });
});
