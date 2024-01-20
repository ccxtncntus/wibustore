import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import * as MailService from "../../services/MailService";
import * as AccountService from "../../services/AccountService";
import { message } from "antd";
import { useEffect, useState } from "react";
import { orbit } from "ldrs";
import "./forgotpassword.css";
import AOS from "aos";
import "aos/dist/aos.css";
orbit.register();
const ForgotPass = () => {
  // Default values shown
  const [Loading, setLoading] = useState(false);
  const [SendToken, setSendToken] = useState(false);
  const natigate = useNavigate();
  useEffect(() => {
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
      if (!SendToken) {
        setLoading(true);
        const send = await MailService.sendPass(data.email);
        console.log(send);
        if (send.status === 400) {
          message.error(send.message);
          setLoading(false);
          return;
        }
        setSendToken(true);
        message.success("Kiểm tra mã xác nhận trong email");
        setLoading(false);
      } else {
        // khi đã có token confirm
        const check = await AccountService.tokenComfirm(
          data.email,
          data.tokenConfirm
        );
        if (check.status === 400) {
          message.error("Mã xác nhận không chính xác");
          return;
        } else {
          // tới trang này khi đã thành công;
          natigate("/changepass", {
            state: { email: data.email, tokenConfirm: data.tokenConfirm },
          });
          // console.log(check.message);
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="forgot_password">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto form_forgot_password"
        style={{ width: 600 }}
        data-aos="fade-up"
      >
        <h4 style={{ textAlign: "center" }}>Quên mật khẩu.</h4>
        {/* email */}
        <p style={{ margin: 0 }}>Email</p>
        <input
          className="form-control mt-2"
          placeholder="Email của bạn..."
          disabled={SendToken}
          {...(!SendToken &&
            register("email", {
              required: {
                value: true,
                message: "Không bỏ trống",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Không đúng email",
              },
            }))}
        />
        {errors.email && (
          <span className="text-danger">{errors.email?.message}</span>
        )}
        {/* Nhập mã xác nhận */}
        {SendToken && (
          <>
            <p style={{ margin: 0 }} className="mt-3">
              Nhập mã xác nhận
            </p>
            <input
              className="form-control mt-2"
              placeholder="Kiểm tra mail để nhận mã..."
              {...register("tokenConfirm", {
                required: {
                  value: true,
                  message: "Không bỏ trống",
                },
              })}
            />
            {errors.tokenConfirm && (
              <span className="text-danger">
                {errors.tokenConfirm?.message}
              </span>
            )}
          </>
        )}
        {/* submit */}
        <div>
          {Loading ? (
            <button className="btn btn-primary mt-3" disabled={true}>
              <l-orbit size="35" speed="1.5" color="black"></l-orbit>
            </button>
          ) : (
            <input
              className="btn btn-primary mt-3"
              type="submit"
              value={SendToken ? "Xác nhận" : "Gửi yêu cầu"}
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
          {/* <NavLink to={"/changepass"} style={{ textDecoration: "none" }}>
            Đổi mật khẩu
          </NavLink> */}
        </div>
      </form>
    </div>
  );
};

export default ForgotPass;
