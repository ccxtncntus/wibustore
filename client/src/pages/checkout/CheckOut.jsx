import { useEffect, useState, useContext } from "react";
import "./checkout.css";
import CheckOutCart from "./CheckOutCart";
import CheckOutInformation from "./CheckOutInformation";
import { useLocation } from "react-router-dom";
import { UContexts } from "../../components/context/UserContext";
const CheckOut = () => {
  const { User } = useContext(UContexts);
  const { state } = useLocation();
  const [Carts, setCarts] = useState([]);
  const [Users, setUser] = useState("");
  const [Totail, setTotail] = useState(0);
  const handleTotail = (i) => {
    setTotail(i);
  };
  useEffect(() => {
    const run = async () => {
      if (User) {
        setUser(User);
      }
      if (state) {
        const { listCart } = state;
        console.log(listCart);
        setCarts(listCart);
      }
    };
    run();
  }, [User]);

  return (
    <div className="checkout row">
      <CheckOutCart onTotail={handleTotail} />
      <CheckOutInformation Carts={Carts} User={Users} Totail={Totail} />
    </div>
  );
};

export default CheckOut;
