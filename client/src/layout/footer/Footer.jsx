import './footer.css';
import { Link } from 'react-router-dom';
const Footer = () => {
  const hadleTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <footer className="footer footer_border">
      <section className="bg-light py-4 py-md-5 py-xl-8 border-top border-light">
        <div className="container overflow-hidden">
          <div className="row gy-4 gy-lg-0 justify-content-xl-between">
            <div className="col-12 col-md-4 col-lg-3 col-xl-2">
              <div className="widget">
                <div className="nav_logo" onClick={hadleTop}>
                  <Link to={'/'}>
                    Wibu<span>store</span>
                  </Link>
                  <br />
                  <span>Dễ dàng, nhanh chóng và an toàn.</span>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-3 col-xl-2">
              <div className="widget">
                <h5 className="widget-title mb-4">Liện hệ</h5>
                <address className="mb-4">
                  Thôn 13, Nam dong, Epo, Đăkwill
                </address>
                <p className="mb-1">
                  <a
                    className="link-secondary text-decoration-none"
                    href="0327297102"
                  >
                    0327297102
                  </a>
                </p>
                <p className="mb-0">
                  <a
                    className="link-secondary text-decoration-none"
                    href="ccxtncn00@gmail.com"
                  >
                    ccxtncn00@gmail.com
                  </a>
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-3 col-xl-2">
              <div className="widget">
                <h5 className="widget-title mb-4">Tìm hiểu thêm</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <a href="#" className="link-secondary text-decoration-none">
                      Liên hệ
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="link-secondary text-decoration-none">
                      Quản cáo
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="link-secondary text-decoration-none">
                      Điều khoản dịch vụ
                    </a>
                  </li>
                  <li className="mb-0">
                    <a href="#" className="link-secondary text-decoration-none">
                      Chính sách bảo mật
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-xl-4">
              <div className="widget">
                <h5 className="widget-title mb-4">Bản tin của chúng tôi</h5>
                <p className="mb-4">
                  Đăng kí để có thể nhận mã giảm giá sớm nhất
                </p>
                <form action="#!">
                  <div className="row gy-4">
                    <div className="col-12">
                      <div className="input-group">
                        <span
                          className="input-group-text"
                          id="email-newsletter-addon"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-envelope"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                          </svg>
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          id="email-newsletter"
                          value=""
                          placeholder="Địa chỉ email"
                          aria-label="email-newsletter"
                          aria-describedby="email-newsletter-addon"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-grid">
                        <button
                          className="btn btn-primary btn_sub_footer"
                          type="submit"
                        >
                          Đăng kí
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="p-4 text-center">&copy; 2024. Wibustore</div>
    </footer>
  );
};

export default Footer;
