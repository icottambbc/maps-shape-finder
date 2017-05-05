import MapMarker from './MapMarker';
import Controls from './Controls';
import React from 'react';
import ReactDOM from 'react-dom';

var map;
var infowindow;
const home = {lat: 51.425, lng: -0.319};

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: home,
    zoom: 13
  });

  ReactDOM.render(
    <Controls map={map}/>,
    document.getElementById('controls')
  );
}

google.maps.event.addDomListener(window, 'load', initMap);

