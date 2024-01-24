import { createContext, useState } from "react";
import CardContext from "./Contexts";
import CateContext from "./CategoriesContexts";
import UserContext from "./UserContext";
export const Contexts = createContext();
function All({ children }) {
  return (
    <Contexts.Provider value={null}>
      <UserContext>
        <CateContext>
          <CardContext>{children}</CardContext>
        </CateContext>
      </UserContext>
    </Contexts.Provider>
  );
}

export default All;
