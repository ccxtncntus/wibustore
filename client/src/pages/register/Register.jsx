import { useForm } from "react-hook-form";
import "./register.css";
import { NavLink } from "react-router-dom";
import * as AccountService from "../../services/AccountService";
import { message } from "antd";
import { useEffect, useState } from "react";
import { orbit } from "ldrs";
import AOS from "aos";
import "aos/dist/aos.css";
orbit.register();
const Register = () => {
  // Default values shown
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
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
      <div className="register">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto form_register"
          style={{ width: 600 }}
          data-aos="fade-up"
        >
          {/* email */}
          <h4 style={{ textAlign: "center" }}>Đăng kí tài khoản</h4>
          <span className="mt-2">Email</span>

          <input
            className="form-control mt-2  "
            placeholder="Email của bạn..."
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
          {/* name */}
          <p className="mt-2" style={{ margin: 0 }}>
            Tên
          </p>
          <input
            className="form-control mt-2  "
            placeholder="Heartsteel..."
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

          {/* password */}

          <p className="mt-2" style={{ margin: 0 }}>
            Mật khẩu
          </p>
          <input
            placeholder="..."
            className="form-control mt-2  "
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-danger">Không bỏ trống</span>
          )}
          {/* Change pass */}
          <p className="mt-2" style={{ margin: 0 }}>
            Nhập lại mật khẩu
          </p>
          <input
            placeholder="..."
            className="form-control mt-2"
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
                className="btn btn-primary mt-3"
                type="submit"
                value={"Đăng kí"}
              />
            )}
          </div>
          <div className="mt-2">
            <span>
              Đã có tài khoản?{" "}
              <NavLink to={"/login"} style={{ textDecoration: "none" }}>
                Đăng nhập.
              </NavLink>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
