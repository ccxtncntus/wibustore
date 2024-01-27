import { createContext, useState } from "react";

export const CategoriesContexts = createContext();

function CateContext({ children }) {
  const [ListCategories, setListCategories] = useState("");
  const addCate = async (data) => {
    setListCategories(data);
  };
  return (
    <CategoriesContexts.Provider value={{ ListCategories, addCate }}>
      {children}
    </CategoriesContexts.Provider>
  );
}

export default CateContext;
