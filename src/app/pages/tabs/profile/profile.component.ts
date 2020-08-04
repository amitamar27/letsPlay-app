import { Component, OnInit } from '@angular/core';
import { Slider } from "tns-core-modules/ui/slider";
import { DatePicker } from "tns-core-modules/ui/date-picker";
import { User } from '../../../services/user.service';
const firebase = require('nativescript-plugin-firebase/app')


@Component({
  selector: 'ns-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user = firebase.auth().currentUser;
  public currentUser = new User()

  public birthdatePicker = false
  minDate: Date = new Date(1975, 0, 29);
  maxDate: Date = new Date(2045, 4, 12);
  public datePicker

  public distance = 0


  public usersCollection = firebase.firestore().collection("users");
  public loggedinUser = this.usersCollection.doc(this.user.uid);

  constructor() { }

  ngOnInit(): void {
  }

  onLoaded(event) {
    console.log(this.currentUser)
    this.loggedinUser.get().then(doc => {
      if (doc.exists) {
        console.log(`Document data: ${JSON.stringify(doc.data())}`);
        this.currentUser = doc.data()
      } else {
        console.log("No such document!");
      }
    });
  }

  // Distance functions
  onSliderValueChange(args) {
    let slider = <Slider>args.object;
    console.log(`Slider new value ${args.value}`);
    this.distance = args.value
    this.currentUser.user_distance = this.distance
  }

  updateDetails() {
    alert(`saving details...`)
    const userDocument = firebase.firestore().collection("users").doc(this.user.uid);
    userDocument.update({
      user_img: this.currentUser.user_img,
      email: this.currentUser.email,
      password: this.currentUser.password,
      user_birthdate: this.currentUser.user_birthdate,
      user_city: this.currentUser.user_city,
      user_first_name: this.currentUser.user_first_name,
      user_last_name: this.currentUser.user_last_name,
      user_gender: this.currentUser.user_gender,
      user_uid: this.currentUser.user_uid,
      user_username: this.currentUser.user_username,
      user_distance: this.currentUser.user_distance,
      user_status: this.user.uid ? true : false
    }).then(() => {
      console.log(`${this.user.uid} updated`);
    });
  }

  // Birthdate functions
  changeBirthdatePicker() {
    this.birthdatePicker = !this.birthdatePicker
  }

  onDatePickerLoaded(args) {
    this.datePicker = args.object as DatePicker;
    this.user.user_birthdate = this.datePicker
  }

  onDateChanged(args) {
    console.log("Date New value: " + args.value);
    console.log("Date value: " + args.oldValue);
  }

  onDayChanged(args) {
    console.log("Day New value: " + args.value);
    console.log("Day Old value: " + args.oldValue);
  }

  onMonthChanged(args) {
    console.log("Month New value: " + args.value);
    console.log("Month Old value: " + args.oldValue);

  }

  onYearChanged(args) {
    console.log("Year New value: " + args.value);
    console.log("Year Old value: " + args.oldValue);

  }

}
