import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { registerElement } from '@nativescript/angular/element-registry';
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import * as Geolocation from "nativescript-geolocation";

// Important - must register MapView plugin in order to use in Angular templates
registerElement('MapView', () => MapView);

@Component({
  selector: 'ns-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  
  public latitude: number;
  public longitude: number;
  private watchId: number;

  zoom = 8;
  minZoom = 0;
  maxZoom = 22;
  bearing = 0;
  tilt = 0;
  padding = [40, 40, 40, 40];
  mapView: MapView;

  lastCamera: String;

  constructor(private zone: NgZone) { 
    this.latitude = 0;
    this.longitude = 0;
  }

  ngOnInit(): void {
    
  }

  //Map events
  onMapReady(event) {
    this.updateLocation()
    console.log('Map Ready');
    this.mapView = event.object;
    this.mapView.zoom = 20
  }

  placeMarker(){
    console.log("Setting a marker...");
    var marker = new Marker();
    marker.position = Position.positionFromLatLng(this.latitude, this.longitude);
    marker.title = "My location";
    marker.snippet = "Israel";
    marker.userData = { index: 1 };

    this.mapView.addMarker(marker);
  }

  onCoordinateTapped(args) {
    console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
  }

  onMarkerEvent(args) {
    // console.log("Marker Event: '" + args.eventName
    //   + "' triggered on: " + args.marker.title
    //   + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
  }

  onCameraChanged(args) {
    // console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
    this.lastCamera = JSON.stringify(args.camera);
  }

  onCameraMove(args) {
    // console.log("Camera moving: " + JSON.stringify(args.camera));
  }

  // GSP
  private getDeviceLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      Geolocation.enableLocationRequest().then(() => {
        Geolocation.getCurrentLocation({ timeout: 10000 }).then(location => {
          resolve(location);
        }).catch(error => {
          reject(error);
        });
      });
    });
  }

  // Get location
  public updateLocation() {
    this.getDeviceLocation().then(result => {
      this.latitude = result.latitude;
      this.longitude = result.longitude;
      console.log(`${this.longitude}, ${this.latitude}`)
      this.placeMarker()
    }, error => {
      console.error(error);
    });
  }

  // in case that i want to watch over the realtime location
  public startWatchingLocation() {
    this.watchId = Geolocation.watchLocation(location => {
      if (location) {
        this.zone.run(() => {
          this.latitude = location.latitude;
          this.longitude = location.longitude;
        });
      }
    }, error => {
      console.log(error);
    }, { updateDistance: 1, minimumUpdateTime: 1000 });
  }

  // to stop realtime location
  public stopWatchingLocation() {
    if (this.watchId) {
      Geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

}
