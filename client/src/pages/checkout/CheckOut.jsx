import { useEffect, useState } from "react";
import "./checkout.css";
import CheckOutCart from "./CheckOutCart";
import CheckOutInformation from "./CheckOutInformation";
import { useLocation } from "react-router-dom";
import * as AccountService from "../../services/AccountService";
import { useCookies } from "react-cookie";
const CheckOut = () => {
  const [cookies] = useCookies(["cookie-name"]);
  const { state } = useLocation();
  const [Carts, setCarts] = useState([]);
  const [User, setUser] = useState("");
  const [Totail, setTotail] = useState(0);
  const handleTotail = (i) => {
    setTotail(i);
  };
  useEffect(() => {
    const run = async () => {
      if (cookies && cookies.token) {
        const user = await AccountService.authen(cookies.token);
        user.status === 200 && setUser(user.data);
      }
      if (state) {
        const { listCart } = state;
        setCarts(listCart);
      }
    };
    run();
  }, []);
  return (
    <div className="checkout row">
      <CheckOutCart onTotail={handleTotail} />
      <CheckOutInformation Carts={Carts} User={User} Totail={Totail} />
    </div>
  );
};

export default CheckOut;
