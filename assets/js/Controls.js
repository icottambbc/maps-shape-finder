import React, { Component } from 'react';
import Circle from './Circle';
import Rectangle from './Rectangle';


// get defaults from the map
// custom shape?

class Controls extends Component{

  constructor() {
    super();
    this.markers = [];

    this.addCircle = this.addCircle.bind(this);
    this.removeCircle = this.removeCircle.bind(this);
    this.addRectangle = this.addRectangle.bind(this);
    this.removeRectangle = this.removeRectangle.bind(this);
    this.filterAndRenderPlaces = this.filterAndRenderPlaces.bind(this);
    this.findPlaces = this.findPlaces.bind(this);
    this.createMarker = this.createMarker.bind(this);
    this.isPlaceInPolygon = this.isPlaceInPolygon.bind(this);
    this.removePolygon = this.removePolygon.bind(this);
    this.clearMarkers = this.clearMarkers.bind(this);
  }

  componentDidMount() {
    this.home = new google.maps.LatLng(this.props.map.getCenter().lat(),this.props.map.getCenter().lng());
    this.infowindow = new google.maps.InfoWindow();
    this.polygonCoords = null;

    //listen for a polygon to be drawn
    var drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.MARKER,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['marker', 'polygon', 'polyline']
      },
      markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
      circleOptions: {
        fillColor: '#ffff00',
        fillOpacity: 1,
        strokeWeight: 5,
        clickable: false,
        editable: true,
        zIndex: 1
      }
    });
    drawingManager.setMap(this.props.map);

    google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
      this.polygon = polygon;
      // this.polygonCoords = polygon.overlay.getPath().getArray();
      // for (var i = this.polygonCoords.length - 1; i >= 0; i--) {
      //   console.log( 'lat: ' + this.polygonCoords[i].lat() + 'lng: ' + this.polygonCoords[i].lng() );
      // }
    }.bind(this));

  }

  removeCircle() {
    this.circle.removeCircle();
  }

  addCircle() {
    const defaultRadius = 500;
    const defaultCentre = this.props.map.getCenter();
    this.circle = new Circle(this.props.map, defaultRadius, defaultCentre);
  }

  removeRectangle() {
    this.rectangle.removeRectangle();
  }

  addRectangle() {
    const lat = this.props.map.getCenter().lat();
    const lng = this.props.map.getCenter().lng();
    const defaultBounds = {
      north: lat + 0.01,
      south: lat - 0.01,
      east: lng + 0.01,
      west: lng - 0.01,
    };
    console.log(this.props.map.getCenter());
    this.rectangle = new Rectangle(this.props.map, defaultBounds);
  }

  findPlaces(e) {
    if(this.polygon){  
      var service = new google.maps.places.PlacesService(this.props.map);

      // replace location and radius with bounds - all from the polygon

      service.textSearch({
        location: this.home,
        radius: '500',
        query: e.target.value
      }, this.filterAndRenderPlaces);
    } else {
      alert('you must draw a polygon');
    }
  }

  filterAndRenderPlaces(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      let resultsCount = 0;

      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        if(this.isPlaceInPolygon(place)){
          this.createMarker(results[i]);
          resultsCount++;
        }
      }

      if(resultsCount){
        alert('Found ' + resultsCount + ' results.');
      } else {
        alert('No results found in your specified area');
      }
    }
  } 

  isPlaceInPolygon(place) {
    var placeLat = place.geometry.location.lat()
    var placeLng = place.geometry.location.lng()
    if(google.maps.geometry.poly.containsLocation(new google.maps.LatLng(placeLat, placeLng), this.polygon)) {
      return true;
    }
  }

  createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: this.props.map,
      position: place.geometry.location
    });
    var map = this.props.map;
    var infowindow = this.infowindow;

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
    this.markers.push(marker);
  }

  clearMarkers() {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
  }

  removePolygon() {
    this.polygon.setMap(null);
    this.clearMarkers();
  }


  render() {

    return (
      <div>
        <p>Find places by circle:</p>
        <a onClick={this.addCircle}>Add Circle</a><br/>
        <a onClick={this.removeCircle}>Remove Circle</a><br/>
        <a onClick={this.addRectangle}>Add Rectangle</a><br/>
        <a onClick={this.removeRectangle}>Remove Rectangle</a><br/>
        <input onBlur={this.findPlaces} style={ {width: '200px'} } placeholder="Find places within your polygon" type="text"></input><br/>
        <a onClick={this.removePolygon}>Remove Polygon</a><br/>
      </div>
    )
  }
}

export default Controls;
