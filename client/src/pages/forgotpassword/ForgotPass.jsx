import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import * as MailService from "../../services/MailService";
import { message } from "antd";
import { useState } from "react";
import { orbit } from "ldrs";
orbit.register();
const ForgotPass = () => {
  // Default values shown
  const [Loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const send = await MailService.sendPass(data.email);
      if (send.status === 400) {
        message.error(send.message);
        setLoading(false);
        return;
      }
      message.success("Kiểm tra mật khẩu mới trong email");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <h4 style={{ textAlign: "center" }}>Quyên mật khẩu</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto"
        style={{ width: 600 }}
      >
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
              value={"Gửi yêu cầu"}
            />
          )}
        </div>
        <div className="mt-2">
          <NavLink to={"/login"} style={{ textDecoration: "none" }}>
            Đăng nhập
          </NavLink>
          {" --- "}
          <NavLink to={"/changepass"} style={{ textDecoration: "none" }}>
            Đổi mật khẩu
          </NavLink>
        </div>
      </form>
    </>
  );
};

export default ForgotPass;
