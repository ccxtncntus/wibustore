import { createContext, useState } from 'react';
export const ProHomeContexts = createContext();

function ProductHomeContext({ children }) {
  const [ProductsHome, setProductsHome] = useState(null);
  const addList = (data) => {
    setProductsHome(data);
  };
  return (
    <ProHomeContexts.Provider value={{ ProductsHome, addList }}>
      {children}
    </ProHomeContexts.Provider>
  );
}
export default ProductHomeContext;
