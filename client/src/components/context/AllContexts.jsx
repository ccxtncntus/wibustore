import { createContext } from 'react';
import CardContext from './Contexts';
import CateContext from './CategoriesContexts';
import UserContext from './UserContext';
import SliderContex from './SliderContex';
import FillterProductsContext from './FillterContext';
export const Contexts = createContext();
// eslint-disable-next-line react/prop-types
function All({ children }) {
  return (
    <Contexts.Provider value={null}>
      <SliderContex>
        <UserContext>
          <CateContext>
            <FillterProductsContext>
              <CardContext>{children}</CardContext>
            </FillterProductsContext>
          </CateContext>
        </UserContext>
      </SliderContex>
    </Contexts.Provider>
  );
}

export default All;
