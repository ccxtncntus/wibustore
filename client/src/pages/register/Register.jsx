import { useForm } from "react-hook-form";
// import "./login.css";
import { NavLink } from "react-router-dom";
import * as AccountService from "../../services/AccountService";
import { message } from "antd";
import { useState } from "react";
import { orbit } from "ldrs";
orbit.register();
const Register = () => {
  // Default values shown
  const [Loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const { name, email, password } = data;
      const regis = await AccountService.register(email, name, password);
      console.log(regis);
      if (regis.status == 200) {
        message.success(regis.message);
      }
      setLoading(false);
    } catch (error) {
      //   console.log(error.response.data.message);
      message.error(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <>
      <h4 style={{ textAlign: "center" }}>Đăng kí</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto"
        style={{ width: 600 }}
      >
        {/* name */}
        <p>Tên</p>
        <input
          className="form-control"
          {...register("name", {
            required: {
              value: true,
              message: "Không bỏ trống",
            },
          })}
        />
        {errors.name && (
          <span className="text-danger">{errors.name?.message}</span>
        )}
        {/* email */}
        <p className="mt-2">Email</p>
        <input
          className="form-control"
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
        {/* password */}
        <p className="mt-2">Mật khẩu</p>
        <input
          className="form-control"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span className="text-danger">Không bỏ trống</span>}
        {/* Change pass */}
        <p className="mt-2">Nhập lại mật khẩu</p>
        <input
          className="form-control"
          type="password"
          {...register("passwordCheck", {
            required: {
              value: true,
              message: "Không bỏ trống",
            },
            validate: (value) =>
              value === watch("password") || "Nhập lại không đúng",
          })}
        />
        {errors.passwordCheck && (
          <span className="text-danger">{errors.passwordCheck?.message}</span>
        )}
        {/* submit */}
        <div>
          {Loading ? (
            <button className="btn btn-primary mt-2" disabled={true}>
              <l-orbit size="35" speed="1.5" color="black"></l-orbit>
            </button>
          ) : (
            <input
              className="btn btn-primary mt-2"
              type="submit"
              value={"Đăng kí"}
            />
          )}
        </div>
        <div>
          <NavLink to={"/login"} style={{ textDecoration: "none" }}>
            Đăng nhập.
          </NavLink>
        </div>
      </form>
    </>
  );
};

export default Register;
