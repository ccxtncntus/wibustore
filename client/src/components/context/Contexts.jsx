/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
export const Contexts = createContext();

function CardContext({ children }) {
  const [cardNumber, setcardNumber] = useState(0);
  const [ListAdd, setListAdd] = useState([]);
  const list = (data) => {
    setListAdd(data);
    setcardNumber(data.length);
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

  const delListAdd = async (data) => {
    const del = ListAdd.filter(
      (item) => item.idProduct == data.idProduct && item.idPrice == data.idPrice
    );
    setListAdd(del);
  };
  const delCardByModal = () => {
    setcardNumber((pre) => pre - 1);
  };

  const delNumberCard = async (number) => {
    setcardNumber((pre) => pre - Number(number));
  };
  return (
    <Contexts.Provider
      value={{
        cardNumber,
        addCard,
        list,
        delCardByModal,
        delNumberCard,
        delListAdd,
      }}
    >
      {children}
    </Contexts.Provider>
  );
}

export default CardContext;
