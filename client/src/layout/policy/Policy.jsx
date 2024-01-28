import "./policy.css";
const Policy = () => {
  return (
    <div className="policy">
      <div className="row policy_border">
        <div className="col-md-3">
          <span>Miễn phí vận chuyển</span>
          <p>Cho các đơn hàng trên 5tr</p>
        </div>
        <div className="col-md-3">
          <span> Hỗ trợ 24/7</span>
          <p>Liên hệ hỗ trợ 24h/ngày</p>
        </div>
        <div className="col-md-3">
          <span>Hoàn tiền 100%</span>
          <p>Nếu sản phẩm bị lỗi, hư hỏng</p>
        </div>
        <div className="col-md-3">
          <span>Chất lượng cao</span>
          <p>Đảm bảo hàng chính hãng 100%</p>
        </div>
      </div>
    </div>
  );
};

export default Policy;
