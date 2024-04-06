import './policy.css';
const Policy = () => {
  return (
    <div className="policy">
      <div className="container">
        <div className="row ">
          <div className="col-md-3 policy_child">
            <p className="m-0 policy_child_boder">Miễn phí vận chuyển</p>
            <p className="m-0">Cho các đơn hàng trên 5 triệu</p>
          </div>
          <div className="col-md-3 policy_child">
            <p className="m-0 policy_child_boder"> Hỗ trợ 24/7</p>
            <p className="m-0">Liên hệ hỗ trợ 24h/ngày</p>
          </div>
          <div className="col-md-3 policy_child">
            <p className="m-0 policy_child_boder">Hoàn tiền 100%</p>
            <p className="m-0">Nếu sản phẩm bị lỗi, hư hỏng</p>
          </div>
          <div className="col-md-3 policy_child">
            <p className="m-0 policy_child_boder">Chất lượng cao</p>
            <p className="m-0">Đảm bảo hàng chính hãng 100%</p>
          </div>
        </div>
      </div>
      <hr className="m-0" />
    </div>
  );
};

export default Policy;
