import { createContext, useState } from "react";
import * as AccountService from "../../services/AccountService";
export const UContexts = createContext();

function UserContext({ children }) {
  const [User, setUser] = useState("");
  const addUser = (data) => {
    setUser(data);
  };
  return (
    <UContexts.Provider value={{ User, addUser }}>
      {children}
    </UContexts.Provider>
  );
}
export default UserContext;
