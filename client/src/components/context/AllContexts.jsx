import { createContext, useState } from "react";
import CardContext from "./Contexts";
import CateContext from "./CategoriesContexts";
export const Contexts = createContext();
function All({ children }) {
  return (
    <Contexts.Provider value={null}>
      <CateContext>
        <CardContext>{children}</CardContext>
      </CateContext>
    </Contexts.Provider>
  );
}

export default All;
