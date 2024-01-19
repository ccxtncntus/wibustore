import { createContext, useState } from "react";
export const Contexts = createContext();

function CardContext({ children }) {
  const [cardNumber, setcardNumber] = useState([]);
  const addCard = async (data) => {
    const test = cardNumber.some((item) => item.Product == data.Product);
    if (test) {
      const index = cardNumber.findIndex(
        (item) => item.Product === data.Product
      );
      cardNumber[index].number += data.number;
    } else {
      setcardNumber([...cardNumber, data]);
    }
  };
  const delCard = async (data) => {
    const test = cardNumber.filter((item) => item.Product !== data);
    setcardNumber(test);
  };
  return (
    <Contexts.Provider value={{ cardNumber, addCard, delCard }}>
      {children}
    </Contexts.Provider>
  );
}

export default CardContext;
