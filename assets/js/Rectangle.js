import MapMarker from './MapMarker';

export default class Rectangle {

  constructor(map, bounds) {
    this.map = map;
    this.bounds = bounds;

    this.mapMarker = new MapMarker(map);
    this.Rectangle = new google.maps.Rectangle({
      bounds: this.bounds,
      editable: true,
    });

    this.drawRectangle = this.drawRectangle.bind(this);
    this.removeRectangle = this.removeRectangle.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.init = this.init.bind(this);
    this.init();
  }

  init() { 
    this.drawRectangle();
    this.mapMarker.getPlaces({
      bounds: this.bounds,
      type: ['store']
    });
    this.handleChange();
  }

  drawRectangle() {
    this.Rectangle.setMap(this.map);
  }

  // remove the Rectangle and its markers
  removeRectangle() {
    this.Rectangle.setMap(null);
    this.mapMarker.clearMarkers();
  }

  handleChange() {
    const mapMarker = this.mapMarker;
    const Rectangle = this.Rectangle;

    // get new markers when the Rectangle radius changes
    google.maps.event.addListener(Rectangle, 'bounds_changed', function() {
     
      mapMarker.getPlaces({
        bounds: Rectangle.getBounds(),
        type: ['store']
      });
    });
  }
}