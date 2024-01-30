import SocialEMail from "./SocialEMail";
import "./social.css";
const Social = () => {
  return (
    <div className="social">
      <div className="social_border row">
        <div className="col-md-6 social_list">
          <span className="social_list_title">Shop social</span>
          <ul className="social_list_ul mt-2">
            <li>
              <a href="">
                <i
                  className="fa-brands fa-facebook"
                  style={{ color: "#4267B2" }}
                ></i>
              </a>
            </li>
            <li>
              <a href="">
                <i
                  className="fa-brands fa-instalod"
                  style={{ color: "#FF007D" }}
                ></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-6">
          <SocialEMail />
        </div>
      </div>
    </div>
  );
};

export default Social;
