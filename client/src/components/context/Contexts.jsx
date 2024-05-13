/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
export const Contexts = createContext();

function CardContext({ children }) {
  const [cardNumber, setcardNumber] = useState(0);
  const [ListAdd, setListAdd] = useState([]);
  const list = (data) => {
    setcardNumber(data);
  };
  const addCard = async (data) => {
    const addCheck = ListAdd.some(
      (item) => item.idProduct == data.idProduct && item.idPrice == data.idPrice
    );
    if (addCheck) {
      // cộng
      console.log('Đã tồn tại sp trong giỏ hàng');
    } else {
      // thêm
      setcardNumber((pre) => pre + 1);
      setListAdd([...ListAdd, data]);
    }
  };
  const delNumberCard = async (number) => {
    setcardNumber((pre) => pre - Number(number));
  };
  const delCardByModal = () => {
    setcardNumber((pre) => pre - 1);
  };
  return (
    <Contexts.Provider
      value={{
        cardNumber,
        addCard,
        list,
        delCardByModal,
        delNumberCard,
      }}
    >
      {children}
    </Contexts.Provider>
  );
}

export default CardContext;
