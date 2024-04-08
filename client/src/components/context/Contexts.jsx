import { createContext, useState } from 'react';
export const Contexts = createContext();

function CardContext({ children }) {
  const [cardNumber, setcardNumber] = useState([]);
  const list = (data) => {
    setcardNumber(data);
  };
  const addCard = async (data) => {
    const test = cardNumber.some((item) => item.name == data.name);
    if (test) {
      // cộng
      console.log('không làm gì');
    } else {
      // thêm
      setcardNumber([...cardNumber, data]);
    }
  };
  const delCard = async (data) => {
    const index = cardNumber.findIndex((item) => item.name !== data.name);
    cardNumber.splice(index, 1);
  };
  return (
    <Contexts.Provider value={{ cardNumber, addCard, delCard, list }}>
      {children}
    </Contexts.Provider>
  );
}

export default CardContext;
