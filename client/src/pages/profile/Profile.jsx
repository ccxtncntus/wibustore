import { useEffect, useState, useContext } from "react";
import "./profile.css";
import AddressUser from "./AddressUser";
import { UContexts } from "../../components/context/UserContext";
import * as AddressService from "../../services/AddressService";
const Profile = () => {
  const { User, addUser } = useContext(UContexts);
  const [EditName, setEditName] = useState(false);
  const [u, setu] = useState(null);
  useEffect(() => {
    if (User) {
      setu(User);
    }
  }, [User]);
  const handleEditName = () => {
    setEditName(true);
  };
  const handleEditNameSuccess = async () => {
    const cName = await AddressService.changeName(u.id, u.name);
    console.log(cName);
    addUser(u);
    setEditName(false);
  };
  const handleEditNameCancel = () => {
    setu(User);
    setEditName(false);
  };
  return (
    <div className="profile">
      <div className="col-md-4">
        <div className="profile_title ">
          <h5>Thông tin tài khoản</h5>
          <div className="profile_title_av">
            <img
              src="https://i.pinimg.com/originals/a9/03/74/a903745cda19c1303bac98bb3a25a775.jpg"
              alt=""
            />
            <div>
              <p className="mb-2">Username</p>
              <p className="mb-2" style={{ fontWeight: 500 }}>
                {!EditName ? (
                  <>
                    <span>{u && u.name}</span>{" "}
                    <i
                      onClick={() => handleEditName()}
                      className="fa-regular fa-pen-to-square"
                    ></i>
                  </>
                ) : (
                  <>
                    <input
                      className="form-control"
                      type="text"
                      value={u && u.name}
                      onChange={(e) => setu({ ...u, name: e.target.value })}
                    />{" "}
                    <i
                      onClick={() => handleEditNameCancel()}
                      className="fa-solid fa-xmark m-2"
                    ></i>
                    <i
                      onClick={() => handleEditNameSuccess()}
                      className="fa-solid fa-check m-2"
                    ></i>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="mt-2 mb-0">Email</p>
          <p style={{ fontWeight: 500 }}>ccxtncn00@gmail.com</p>
        </div>
      </div>
      <div className="profile_address col-md-8">
        <AddressUser />
      </div>
      <div></div>
    </div>
  );
};

export default Profile;

// ffba68203922880823643de2da21ca701f935ebc;
