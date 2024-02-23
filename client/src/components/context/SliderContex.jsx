import { createContext, useState } from "react";
export const SliContexts = createContext();

function SlidersContext({ children }) {
  const [slidersC, setslidersC] = useState([]);
  const list = (data) => {
    // console.log(data);
    setslidersC(data);
  };
  return (
    <SliContexts.Provider value={{ slidersC, list }}>
      {children}
    </SliContexts.Provider>
  );
}

export default SlidersContext;
