import { createContext, useState } from "react";
export const Contexts = createContext();

function CardContext({ children }) {
  const [cardNumber, setcardNumber] = useState([]);
  const list = (data) => {
    console.log(data);
    setcardNumber(data);
  };

  const addCard = async (data) => {
    const test = cardNumber.some((item) => item.name == data.sp.name);
    if (test) {
      const index = cardNumber.findIndex((item) => item.name === data.sp.name);
      cardNumber[index].quantity += Number(data.sl);
    } else {
      data.sp.img = data.img;
      setcardNumber([...cardNumber, data.sp]);
    }
  };
  const delCard = async (data) => {
    const test = cardNumber.filter((item) => item !== data);
    setcardNumber(test);
  };
  return (
    <Contexts.Provider value={{ cardNumber, addCard, delCard, list }}>
      {children}
    </Contexts.Provider>
  );
}

export default CardContext;
