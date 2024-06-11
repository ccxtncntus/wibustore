import { createContext } from 'react';
import CardContext from './Contexts';
import UserContext from './UserContext';
import FillterProductsContext from './FillterContext';
export const Contexts = createContext();
// eslint-disable-next-line react/prop-types
function All({ children }) {
  return (
    <Contexts.Provider value={null}>
      <UserContext>
        <FillterProductsContext>
          <CardContext>{children}</CardContext>
        </FillterProductsContext>
      </UserContext>
    </Contexts.Provider>
  );
}

export default All;
