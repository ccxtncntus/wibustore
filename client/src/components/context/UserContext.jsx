/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
export const UContexts = createContext();

function UserContext({ children }) {
  const [User, setUser] = useState('');
  const addUser = (data) => {
    setUser(data);
  };
  const delUser = () => {
    setUser('');
  };
  return (
    <UContexts.Provider value={{ User, addUser, delUser }}>
      {children}
    </UContexts.Provider>
  );
}
export default UserContext;
