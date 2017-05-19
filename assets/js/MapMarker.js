export default class MapMarker {

  constructor(map) {
    // constants
    this.map = map;
    this.markers = [];
    this.infowindow = new google.maps.InfoWindow();
    // this.service = new google.maps.places.PlacesService(map);

    // functions
    this.handlePlacesSearch = this.handlePlacesSearch.bind(this);
    this.clearMarkers = this.clearMarkers.bind(this);
    this.createMarker = this.createMarker.bind(this);
  }

  getPlaces(request) {
    this.service.nearbySearch(request, this.handlePlacesSearch);
  }


  handlePlacesSearch(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // clear up old markers
      this.clearMarkers();
      for (var i = 0; i < results.length; i++) {
        this.createMarker(results[i]);
      }
    }
  }

  clearMarkers() {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
  }

  createMarker(place) { 
    const placeLoc = place.geometry.location;
    const long = placeLoc.lng();
    const lat = placeLoc.lat();
    let infowindow = this.infowindow;
    let map = this.map;

    const marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
    this.markers.push(marker);
  }

}