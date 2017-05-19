import React from 'react';

const InfoWindow = (props) => (
  <div>
    <div><span>Name: </span>{props.place.name}</div>
    <div><span>Address: </span>{props.place.formatted_address}</div>
    <img width='40' height='40' src={props.place.icon} />
    {props.place.rating ? <div><span>Rating: </span>{props.place.rating}</div> : '' }
  </div>
);

// InfoWindow.propTypes = {
//   name: scopesValidation,
// };

export default InfoWindow;