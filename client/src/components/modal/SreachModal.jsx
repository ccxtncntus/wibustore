import { useEffect, useState, useRef } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./sreachmodal.css";
import { useDebounce } from "@uidotdev/usehooks";
import * as ProductService from "../../services/ProductService";
import { HOST } from "../../configs/DataEnv";
import { FormatNumber } from "../../helpers/FormatNumber";
import { Link } from "react-router-dom";

const SreachModal = (props) => {
  const { placement, show, onClose } = props;
  const [Sreach, setSreach] = useState("");
  const [ListSreach, setListSreach] = useState([]);
  const [IsSreach, setIsSreach] = useState(false);
  const debouncedSearch = useDebounce(Sreach, 300);
  const nameRef = useRef();
  const [Load, setLoad] = useState(false);
  useEffect(() => {
    const chay = async () => {
      if (show) {
        setLoad((pre) => !pre);
        setListSreach([]);
        setSreach("");
      }
    };
    chay();
  }, [show]);
  useEffect(() => {
    const chay = async () => {
      if (nameRef.current) {
        nameRef.current.focus();
      }
    };
    chay();
  }, [Load]);

  useEffect(() => {
    const chay = async () => {
      if (Sreach != "") {
        setIsSreach(true);
        const data = await ProductService.onceProduct(Sreach.trim());
        data.status === 200 ? setListSreach(data.data) : setListSreach([]);
        setIsSreach(false);
      }
    };
    chay();
  }, [debouncedSearch]);
  const formatImg = (list) => {
    const img = list.split(",")[0].trim();
    return img;
  };
  return (
    <>
      <Offcanvas show={show} onHide={onClose} placement={placement}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Tìm kiếm</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="form-group">
            <input
              autoFocus={true}
              ref={nameRef}
              type="text"
              className="form-control"
              placeholder="Tìm kiếm"
              value={Sreach}
              onChange={(e) => setSreach(e.target.value)}
            />
            <hr className="mt-4" />
            {/* child */}
            {IsSreach && "Đang tìm kiếm"}
            {!IsSreach && ListSreach.length > 0
              ? ListSreach.map((item, index) => {
                  return (
                    <div className="sreachModal" key={index}>
                      <img
                        src={HOST + "/uploads/" + formatImg(item.all_images)}
                        alt={item.name}
                      />
                      <span>
                        <Link to={`shop/${item.id}`} onClick={onClose}>
                          {item.name}
                        </Link>
                        <p>{FormatNumber(item.price - item.saleoff)}</p>
                      </span>
                    </div>
                  );
                })
              : "..."}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SreachModal;
