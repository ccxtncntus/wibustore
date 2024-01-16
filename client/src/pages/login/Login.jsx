import { useForm } from "react-hook-form";
import "./login.css";
import { NavLink } from "react-router-dom";
import * as AccountService from "../../services/AccountService";
import { message } from "antd";
import { useCookies } from "react-cookie";
const Login = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const login = await AccountService.login(data.email, data.password);
      if (login.status === 400) {
        console.log(login);
        message.error(login.message);
      } else {
        console.log(login);
        let d = new Date();
        d.setTime(d.getTime() + 120 * 60 * 1000);
        message.success("Đăng nhập thành công");
        setCookie("token", login.token, { path: "/", expires: d });
      }
    } catch (error) {
      console.log(error);
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
          <input
            className="btn btn-primary mt-2"
            type="submit"
            value={"Đăng nhập"}
          />
        </div>
        <div>
          <NavLink style={{ textDecoration: "none" }}>Đăng kí</NavLink>
        </div>
        <div>
          <NavLink style={{ textDecoration: "none" }}>Quyên mật khẩu</NavLink>
        </div>
      </form>
    </>
  );
};

export default Login;
