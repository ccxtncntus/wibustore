import { useCallback, useEffect, useState } from 'react';
import './contact.css';

// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import ContactForm from './ContactForm';

const Contact = () => {
  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  const defaultCenter = {
    lat: 12.6449971,
    lng: 107.8678297,
  };

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         console.log(latitude, longitude);
  //         // what to do once we have the position
  //       },
  //       (error) => {
  //         // display an error if we cant get the users position
  //         console.error('Error getting user location:', error);
  //       }
  //     );
  //   } else {
  //     // display an error if not supported
  //     console.error('Geolocation is not supported by this browser.');
  //   }
  // }, []);
  return (
    <>
      <div className="contact_vip p-4">
        <div
          className="contact container"
          style={{
            // minHeight: 800,
            width: '60%',
            margin: '0 auto',
          }}
        >
          <h2 className="text-center">Liên hệ</h2>
          <h5>Bạn có thể liên hệ với Wibu theo thông tin sau:</h5>
          <ul>
            <li>
              Hotline{' '}
              <a href="#" className="fixa">
                0327297102
              </a>
            </li>
            <li>
              Zalo{' '}
              <a href="#" className="fixa">
                0327297102
              </a>
            </li>
            <li>
              Gmail{' '}
              <a href="#" className="fixa">
                ccxtncn00@gmail.com
              </a>
            </li>
          </ul>
          <div className="contact_map">
            <LoadScript googleMapsApiKey="AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao">
              <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={10}
                center={defaultCenter}
              >
                <Marker position={defaultCenter} />
              </GoogleMap>
            </LoadScript>
          </div>
          <ContactForm />
        </div>
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
