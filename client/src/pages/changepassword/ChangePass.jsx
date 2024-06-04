import { useForm } from 'react-hook-form';
// import "./login.css";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import * as AccountService from '../../services/AccountService';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { orbit } from 'ldrs';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './changepassword.css';
import bg from '/changePass.jpg';
import { useCookies } from 'react-cookie';
orbit.register();
const ChangePass = () => {
  const natigate = useNavigate();
  const [cookies] = useCookies(['token', 'path_end']);
  const { state } = useLocation();
  const [Loading, setLoading] = useState(false);
  const [Email, setEmail] = useState('');
  useEffect(() => {
    const run = async () => {
      AOS.init({
        duration: 1000,
      });
      AOS.refresh();
      if (state) {
        const { tokenConfirm, email } = state;
        setEmail(email);
        const delTokenC = await AccountService.delTokenComfirm(
          email,
          tokenConfirm
        );
        delTokenC.status === 200 && console.log(delTokenC);
      }
      if (cookies && cookies.token) {
        const user = await AccountService.authen(cookies.token);
        user.status === 200 && setEmail(user.data.email);
      }
    };
    run();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (state) {
        const changeWithToken = await AccountService.changePassWithToken(
          state.email,
          data.password
        );
        console.log(changeWithToken);
        if (changeWithToken.status === 400) {
          message.error(changeWithToken.message);
          setLoading(false);
          return;
        }
        message.success(changeWithToken.message);
        natigate('/login');
        setLoading(false);
      } else {
        console.log(cookies.token);
        if (cookies && cookies.token) {
          const { passwordOld, password } = data;
          const change = await AccountService.changePass(
            Email,
            password,
            passwordOld
          );
          if (change.status === 400) {
            message.error(change.message);
            setLoading(false);
            return;
          }
          message.success(change.message);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleCancel = () => {
    // console.log(cookies.path_end);
    natigate(cookies.path_end);
  };
  return (
    <div
      className="changepassword"
      style={{
        background: `url('${bg}')
    center/cover no-repeat`,
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto form_changepassword"
        style={{ width: 600 }}
        data-aos="fade-up"
      >
        <h4 style={{ textAlign: 'center' }}>Cập nhật mật khẩu</h4>
        {/* email */}
        <p className="mt-2" style={{ margin: 0 }}>
          Email
        </p>
        <input
          defaultValue={Email}
          disabled={true}
          className="form-control mt-2"
        />
        {errors.email && (
          <span className="text-danger">{errors.email?.message}</span>
        )}
        {!state && (
          <>
            {/* password old */}
            <p className="mt-2">Mật khẩu cũ</p>
            <input
              className="form-control"
              type="password"
              {...register('passwordOld', { required: true })}
            />
            {errors.passwordOld && (
              <span className="text-danger">Không bỏ trống</span>
            )}
          </>
        )}
        {/* password new */}
        <p className="mt-2" style={{ margin: 0 }}>
          Mật khẩu mới
        </p>
        <input
          className="form-control mt-2"
          type="password"
          {...register('password', {
            required: {
              value: true,
              message: 'Không bỏ trống',
            },
            validate: (value) =>
              value !== watch('passwordOld') || 'Mật khẩu cũ ???',
          })}
        />
        {errors.password && (
          <span className="text-danger">{errors.password?.message}</span>
        )}
        {/* Change pass */}
        <p className="mt-2" style={{ margin: 0 }}>
          Nhập lại mật khẩu
        </p>
        <input
          className="form-control mt-2"
          type="password"
          {...register('passwordCheck', {
            required: {
              value: true,
              message: 'Không bỏ trống',
            },
            validate: (value) =>
              value === watch('password') || 'Nhập lại không đúng',
          })}
        />
        {errors.passwordCheck && (
          <span className="text-danger">{errors.passwordCheck?.message}</span>
        )}
        {/* submit */}
        <div>
          {Loading ? (
            <button className="btn btn-primary mt-3" disabled={true}>
              <l-orbit size="35" speed="1.5" color="black"></l-orbit>
            </button>
          ) : (
            <>
              <input
                className="btn btn-primary mt-3"
                type="submit"
                value={'Đổi mật khẩu'}
              />{' '}
              <button
                className={'btn btn-secondary mt-3'}
                onClick={handleCancel}
                style={{ textDecoration: 'none' }}
              >
                Quay lại
              </button>
            </>
          )}
        </div>
        {!cookies && (
          <div className="mt-2">
            <span>
              Đã có tài khoản?{' '}
              <NavLink to={'/login'} style={{ textDecoration: 'none' }}>
                Đăng nhập.
              </NavLink>
            </span>
          </div>
        )}
      </form>
    </div>
  );
};
export default ChangePass;
