import { useForm } from "react-hook-form";
import "./login.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as AccountService from "../../services/AccountService";
import { message } from "antd";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { orbit } from "ldrs";

orbit.register();
const Login = () => {
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
      <h4 style={{ textAlign: "center" }}>Login</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto"
        style={{ width: 600 }}
      >
        <p>Email</p>
        <input
          className="form-control"
          placeholder="..."
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
        <p className="mt-4">Password</p>
        <input
          className="form-control"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span className="text-danger">Không bỏ trống</span>}
        <div>
          {Loading ? (
            <button className="btn btn-primary mt-2" disabled={true}>
              <l-orbit size="35" speed="1.5" color="black"></l-orbit>
            </button>
          ) : (
            <>
              <input
                className="btn btn-primary mt-2"
                type="submit"
                value={"Đăng nhập"}
              />{" "}
              {cookies.path_end && (
                <Link to={cookies.path_end} className="btn btn-secondary mt-2">
                  hủy
                </Link>
              )}
            </>
          )}
        </div>
        <div>
          <NavLink to={"/register"} style={{ textDecoration: "none" }}>
            Đăng kí
          </NavLink>
        </div>
        <div>
          <NavLink to={"/forgotpass"} style={{ textDecoration: "none" }}>
            Quyên mật khẩu
          </NavLink>
        </div>
        <div>
          <NavLink to={"/changepass"} style={{ textDecoration: "none" }}>
            Đổi mật khẩu
          </NavLink>
        </div>
      </form>
    </>
  );
};

export default Login;
