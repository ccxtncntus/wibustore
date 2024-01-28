import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./sreachmodal.css";
import { Link, NavLink } from "react-router-dom";
const SreachModal = (props) => {
  const { placement, show, onClose } = props;
  const [Sreach, setSreach] = useState("");
  useEffect(() => {
    if (Sreach != "") {
      console.log(Sreach.trim());
    }
    return () => {};
  }, [Sreach]);

  return (
    <>
      <Offcanvas show={show} onHide={onClose} placement={placement}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Tìm kiếm</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Tìm kiếm"
              value={Sreach}
              onChange={(e) => setSreach(e.target.value)}
            />
            <hr className="mt-4" />
            {/* child */}
            <div className="sreachModal">
              <img
                src="https://statics.pancake.vn/web-media/ff/d5/d9/56/5a78cf943a67fb9788d8484f620332e65bee1c2332aaed3591797b23.jpg"
                alt=""
              />
              <span>
                <Link>name</Link>
                <p>Price</p>
              </span>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SreachModal;
