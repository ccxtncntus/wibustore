import { createContext, useState } from "react";
import CardContext from "./Contexts";
import CateContext from "./CategoriesContexts";
import UserContext from "./UserContext";
import SliderContex from "./SliderContex";
import ProductHomeContex from "./ProductHomeContex";
export const Contexts = createContext();
function All({ children }) {
  return (
    <Contexts.Provider value={null}>
      <ProductHomeContex>
        <SliderContex>
          <UserContext>
            <CateContext>
              <CardContext>{children}</CardContext>
            </CateContext>
          </UserContext>
        </SliderContex>
      </ProductHomeContex>
    </Contexts.Provider>
  );
}

export default All;
