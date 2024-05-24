import { createContext, useState } from 'react';

export const FillterProducts = createContext();

// eslint-disable-next-line react/prop-types
const FillterProductsContext = ({ children }) => {
  const [ListFillter, setListFillter] = useState([]);

  return (
    <FillterProducts.Provider value={{ ListFillter, setListFillter }}>
      {children}
    </FillterProducts.Provider>
  );
};

export default FillterProductsContext;
