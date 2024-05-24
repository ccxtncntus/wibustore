/* eslint-disable react/prop-types */
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';
const editorConfiguration = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'blockQuote',
      'insertTable',
      'undo',
      'redo',
      'underline',
      'fontColor',
      'fontBackgroundColor',
      'fontSize',
      'fontFamily',
    ],
  },
  language: 'en',
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
};
const TTesst = ({ setDescription, description }) => {
  // eslint-disable-next-line no-unused-vars
  const [data, setdata] = useState('');
  const handleChange = (event, editor) => {
    setDescription(editor.getData());
  };
  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data={description}
        onChange={handleChange}
        ư
      />
    </>
  );
};

export default TTesst;
