import { Component, OnInit } from "@angular/core";
import * as geolocation from "nativescript-geolocation";
import * as GooglePlaces from 'nativescript-plugin-google-places';
import { Accuracy } from "tns-core-modules/ui/enums"; // used to describe at what accuracy the location should be get
const firebase = require("nativescript-plugin-firebase");


@Component({
  selector: "ns-app",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {

  
  ngOnInit():void {
    GooglePlaces.init();
    geolocation.enableLocationRequest();
    firebase.init({
      // Optionally pass in properties for database, authentication and cloud messaging,
      // see their respective docs.
    }).then(
      () => {
        console.log("firebase.init done");
      },
      error => {
        console.log(`firebase.init error: ${error}`);
      }
    );
  }
}
