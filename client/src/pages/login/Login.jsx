import { useForm } from "react-hook-form";
import "./login.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as AccountService from "../../services/AccountService";
import { message } from "antd";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { orbit } from "ldrs";
import AOS from "aos";
import "aos/dist/aos.css";
orbit.register();
const Login = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  }, []);
  // Default values shown
  const natigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token", "path_end"]);
  const [Loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const login = await AccountService.login(data.email, data.password);
      if (login.status === 400) {
        console.log(login);
        message.error(login.message);
        setLoading(false);
      } else {
        console.log(login);
        let d = new Date();
        d.setTime(d.getTime() + 120 * 60 * 1000);
        message.success("Đăng nhập thành công");
        cookies.path_end ? natigate(cookies.path_end) : natigate("/");
        await removeCookie("path_end");
        setCookie("token", login.token, { path: "/", expires: d });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="login">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto login_form"
          style={{ width: 600 }}
          data-aos="fade-up"
        >
          <h4 style={{ textAlign: "center", margin: 0 }}>
            Chào mừng tới Wibushop
          </h4>
          <p style={{ textAlign: "center" }} className="mb-4">
            Nơi mua sắm trực tuyến dễ dàng, nhanh chóng và an toàn.
          </p>
          <p className="mt-2" style={{ margin: 0 }}>
            Tài khoản
          </p>
          <input
            className="form-control mt-2 "
            placeholder="Email của bạn"
            {...register("email", {
              required: {
                value: true,
                message: "Không bỏ trống",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Không đúng email",
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
            {...register("password", { required: true })}
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
                  value={"Đăng nhập"}
                />{" "}
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
          <div className="mt-2">
            <span>
              Chưa có tài khoản?{" "}
              <NavLink to={"/register"} style={{ textDecoration: "none" }}>
                Đăng kí.
              </NavLink>
            </span>
          </div>
          <div>
            <NavLink to={"/forgotpass"} style={{ textDecoration: "none" }}>
              Quên mật khẩu.
            </NavLink>
          </div>
          {/* <div>
            <NavLink to={"/changepass"} style={{ textDecoration: "none" }}>
              Đổi mật khẩu.
            </NavLink>
          </div> */}
        </form>
      </div>
    </>
  );
};

export default Login;
