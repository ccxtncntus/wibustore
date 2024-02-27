import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import "./notifi.css";
import Pusher from "pusher-js";
import { UContexts } from "../../components/context/UserContext";
import * as OrdersService from "../../services/OrdersService";
import { message } from "antd";
const Notification = () => {
  const { User } = useContext(UContexts);
  const [Processing, setProcessing] = useState(0);
  const [Hide, setHide] = useState(false);
  const hadleMouse = () => {
    setHide(true);
  };
  const handleLeave = () => {
    setHide(false);
  };
  useEffect(() => {
    const pusher = new Pusher("3c30b00645ce31e7d36e", {
      cluster: "ap1",
    });
    const channel = pusher.subscribe("chat");
    channel.bind("message", function (data) {
      OrdersService.getPending()
        .then((i) => {
          setProcessing(i.count);
          console.log("đã nhận thông báo");
          // message.warning("Có đơn hàng mới cần xử lí");
        })
        .catch((e) => console.log(e));
      return;
    });
  }, []);
  useEffect(() => {
    if (User) {
      OrdersService.getPending()
        .then((i) => {
          setProcessing(i.count);
        })
        .catch((e) => console.log(e));
    }
  }, [User]);

  return (
    <div style={{ position: "relative" }} className="notification">
      {Processing > 0 ? (
        <NavLink
          to={"/admin/orders"}
          onMouseEnter={hadleMouse}
          onMouseLeave={handleLeave}
        >
          <Badge badgeContent={Processing} color="primary">
            <NotificationsNoneIcon color="rgb(0, 139, 232)" className="icon" />
          </Badge>
        </NavLink>
      ) : (
        <Badge
          badgeContent={Processing}
          color="primary"
          onMouseEnter={hadleMouse}
          onMouseLeave={handleLeave}
        >
          <NotificationsNoneIcon color="rgb(0, 139, 232)" className="icon" />
        </Badge>
      )}
      <div
        className={
          Hide
            ? "notification_content"
            : "notification_content notification_content_hide"
        }
        style={{ position: "absolute" }}
      >
        {Processing > 0
          ? Processing + " đơn hàng chưa xử lí"
          : "Không có đơn hàng chờ xử lí"}
      </div>
    </div>
  );
};
export default Notification;
