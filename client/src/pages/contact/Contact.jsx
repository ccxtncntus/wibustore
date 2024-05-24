import './contact.css';
const Contact = () => {
  return (
    <>
      <div
        className="contact"
        style={{
          width: '100%',
          height: '800px',
        }}
      >
        <div
          style={{
            width: '20%',
            height: '200px',
            position: 'sticky',
            backgroundColor: 'red',
            top: '20px',
          }}
        >
          Sticky
        </div>
      </div>
      <div
        style={{
          height: '500px',
        }}
      >
        sád
      </div>
    </>
  );
};

export default Contact;
