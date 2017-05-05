import MapMarker from './MapMarker';

export default class Circle {

  constructor(map, radius, center) {
    this.map = map;
    this.radius = radius;
    this.center = center;

    this.mapMarker = new MapMarker(map);
    this.circle = new google.maps.Circle({
      center: center,
      radius: radius,
      editable: true,
    });

    this.drawCircle = this.drawCircle.bind(this);
    this.removeCircle = this.removeCircle.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.init = this.init.bind(this);
    this.init();
  }

  init() { 
    this.drawCircle();
    this.mapMarker.getPlaces({
      location: this.center,
      radius: this.radius,
      type: ['store']
    });
    this.handleChange();
  }

  drawCircle() {
    this.circle.setMap(this.map);
  }

  // remove the circle and its markers
  removeCircle() {
    this.circle.setMap(null);
    this.mapMarker.clearMarkers();
  }

  handleChange() {
    const mapMarker = this.mapMarker;
    const circle = this.circle;

    // get new markers when the circle radius changes
    google.maps.event.addListener(circle, 'radius_changed', function() {
      mapMarker.getPlaces({
        location: circle.getCenter(),
        radius: circle.getRadius(),
        type: ['store']
      });
    });

    // get new markers when the circle centre changes
    google.maps.event.addListener(circle, 'center_changed', function() {
      mapMarker.getPlaces({
        location: circle.getCenter(),
        radius: circle.getRadius(),
        type: ['store']
      });
    });
  }
}