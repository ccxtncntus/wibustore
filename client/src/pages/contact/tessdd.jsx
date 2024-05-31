import { useEffect, useState } from 'react';
import './contact.css';
// import { useEffect, useState } from 'react';
// import { DndContext } from '@dnd-kit/core';

// import { Droppable } from './Droppable';
// import { Draggable } from './Draggable';
import toxic from '../../../toxic.json';
// import { dictionary } from '../../helpers/Dic';
const Contact = () => {
  //   const [parent, setParent] = useState(null);
  //   const ids = [1, 2, 3, 4, 5];
  //   // const draggableMarkup = <Draggable id="draggable">{nv}</Draggable>;
  //   const draggableMarkup = ids.map((id) => (
  //     <Draggable key={id} id={id}>
  //       {'name' + id}
  //     </Draggable>
  //   ));
  //   const [number, setnumber] = useState(null);
  //   function handleDragEnd(event) {
  //     const { over, active } = event;
  //     console.log({ keo: active.id });
  //     const find = ids.filter((item) => item == active.id)[0];
  //     setnumber(find - 1);
  //     setParent(over ? over.id : null);
  //   }
  //   useEffect(() => {
  //     console.log({ tha: parent });
  //   }, [parent]);

  //   const aaa = [
  //     {
  //       id: 12,
  //       name: 'Tuấn',
  //     },
  //     {
  //       id: 8,
  //       name: 'An',
  //     },
  //     {
  //       id: 2,
  //       name: 'Hoài',
  //     },
  //   ];
  //   const fi = (indexs) => {
  //     const filteredDraggableMarkup = draggableMarkup.filter(
  //       (_, index) => index !== indexs
  //     );
  //     return filteredDraggableMarkup;
  //   };
  const [text, settext] = useState('');
  const handleCheck = () => {
    checkValidate();
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      checkValidate();
    }
  };
  // useEffect(() => {
  //   const toxics = Object.keys(toxic);
  //   for (let index = 0; index < 99; index++) {
  //     const element = toxics[index];
  //     console.log(element.replaceAll('_', ' '));
  //   }
  // }, []);
  const [validat, setvalidat] = useState('');
  const checkValidate = () => {
    const validate = Object.keys(toxic).some((v) =>
      text.toLowerCase().includes(v.replaceAll('_', ' '))
    );
    if (!validate) {
      setvalidat('Thêm đi');
      return;
    }
    setvalidat('Từ không hợp lệ');
  };

  return (
    <>
      <div
        className="contact"
        style={{
          height: '800px',
        }}
      >
        {/* <span>{JSON.stringify(dictionary)}</span> */}
        {/* <DndContext onDragEnd={handleDragEnd}>
          {parent === null ? draggableMarkup : fi(number)}
          {aaa.map((i, index) => (
            <Droppable key={index} id={i.id}>
              {i.name} {parent === i.id ? draggableMarkup[number] : `😊`}
            </Droppable>
          ))}
        </DndContext> */}
        <textarea
          onChange={(e) => settext(e.target.value)}
          className="form-control"
          rows={3}
          onKeyDown={handleKeyDown}
        ></textarea>
        <div style={{ textAlign: 'right' }}>
          <button
            disabled={text.trim() == ''}
            onClick={handleCheck}
            className="btn btn-primary mt-2"
          >
            Check
          </button>
        </div>
        <span>{validat}</span>
      </div>
    </>
  );
};

export default Contact;
{
  /* {[...Array(3)].map((_, index) => (
            <Droppable key={index} id={index}>
              {parent === index ? draggableMarkup : `Drop ${index}`}
            </Droppable>
          ))} */
}
