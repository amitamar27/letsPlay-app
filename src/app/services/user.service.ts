import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  
}

export class User{
  user_img:string
  email:string
  password:string
  check_password:string
  user_birthdate:Date
  user_city:string
  user_first_name:string
  user_last_name:string
  user_gender:string
  user_uid:string
  user_username:string
  user_distance:number
  user_status:boolean

}

