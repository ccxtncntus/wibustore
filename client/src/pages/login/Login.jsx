import { useForm } from 'react-hook-form';
import './login.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import * as AccountService from '../../services/AccountService';
import { message } from 'antd';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { orbit } from 'ldrs';
import AOS from 'aos';
import 'aos/dist/aos.css';
import loginImg from '/login.jpg';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../../firebase/FireBaseConfig';
orbit.register();
const Login = () => {
  const natigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'path_end']);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (cookies.token) {
      removeCookie('token');
    }
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const login = await AccountService.login(data.email, data.password);
      console.log(login);
      if (login.status === 400) {
        console.log(login);
        message.error(login.message);
        setLoading(false);
      } else {
        let d = new Date();
        d.setTime(d.getTime() + 1200 * 60 * 1000);
        message.success('Đăng nhập thành công');
        cookies.path_end && cookies.path_end != '/login'
          ? natigate(cookies.path_end)
          : natigate('/');
        await removeCookie('path_end');
        setCookie('token', login.token, { path: '/', expires: d });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const style = {
    backgroundImage: `url("${loginImg}")`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
  const handleLoginGG = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const loginGG = await AccountService.loginGG(
          user.email,
          user.displayName
        );
        console.log(loginGG);
        if (loginGG) {
          let d = new Date();
          d.setTime(d.getTime() + 1200 * 60 * 1000);
          message.success('Đăng nhập thành công');
          cookies.path_end && cookies.path_end != '/login'
            ? natigate(cookies.path_end)
            : natigate('/');
          await removeCookie('path_end');
          setCookie('token', loginGG.token, { path: '/', expires: d });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        message.error('Có lỗi xảy ra xin thử lại sau');
      });
  };
  // const handleOutGG = async () => {
  //   signOut(auth)
  //     .then(() => {
  //       message.success('Đăng nhập thành công');
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       message.error('Có lỗi xảy ra xin thử lại sau');
  //     });
  // };
  return (
    <>
      <div className="login" style={style}>
        <div className="login_form" data-aos="fade-up">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto"
            style={{ width: 540 }}
          >
            <h4 data-testid={'vip1'} style={{ textAlign: 'center', margin: 0 }}>
              Chào mừng tới Wibushop
            </h4>
            <p style={{ textAlign: 'center' }} className="mb-4">
              Nơi mua sắm trực tuyến dễ dàng, nhanh chóng và an toàn.
            </p>
            <p className="mt-2" style={{ margin: 0 }}>
              Tài khoản
            </p>
            <input
              className="form-control mt-2 "
              placeholder="Email của bạn"
              {...register('email', {
                required: {
                  value: true,
                  message: 'Không bỏ trống',
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Không đúng email',
                },
              })}
            />
            {errors.email && (
              <span className="text-danger">{errors.email?.message}</span>
            )}

            <p className="mt-2" style={{ margin: 0 }}>
              Mật khẩu
            </p>
            <input
              className="form-control mt-2"
              type="password"
              placeholder="..."
              {...register('password', { required: true })}
            />
            {errors.password && (
              <span className="text-danger">Không bỏ trống</span>
            )}
            <div>
              {Loading ? (
                <button className="btn btn-primary mt-2" disabled={true}>
                  <l-orbit size="35" speed="1.5" color="black"></l-orbit>
                </button>
              ) : (
                <>
                  <input
                    className="btn btn-primary mt-4"
                    type="submit"
                    value={'Đăng nhập'}
                  />{' '}
                  {cookies.path_end && (
                    <Link
                      to={cookies.path_end}
                      className="btn btn-secondary mt-4"
                    >
                      hủy
                    </Link>
                  )}
                </>
              )}
            </div>
          </form>
          <button
            className="login-with-google-btn mt-2"
            onClick={handleLoginGG}
          >
            Đăng nhập với google{' '}
          </button>
          {/* <button className="loginGoogle_btn mt-2" onClick={handleOutGG}>
            <i className="fa-brands fa-google"></i> Logout{' '}
          </button> */}
          <div className="mt-2">
            <span>
              Chưa có tài khoản?{' '}
              <NavLink to={'/register'} style={{ textDecoration: 'none' }}>
                Đăng kí.
              </NavLink>
            </span>
          </div>
          <div>
            <NavLink to={'/forgotpass'} style={{ textDecoration: 'none' }}>
              Quên mật khẩu.
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
