import { createContext, useState } from "react";
import CardContext from "./Contexts";
import CateContext from "./CategoriesContexts";
import UserContext from "./UserContext";
import SliderContex from "./SliderContex";
export const Contexts = createContext();
function All({ children }) {
  return (
    <Contexts.Provider value={null}>
      <SliderContex>
        <UserContext>
          <CateContext>
            <CardContext>{children}</CardContext>
          </CateContext>
        </UserContext>
      </SliderContex>
    </Contexts.Provider>
  );
}

export default All;
