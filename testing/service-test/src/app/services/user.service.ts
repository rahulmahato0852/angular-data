import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: string[] = [
    "rushi", "rahul", "amol", "vishal", "vishnu"
  ]

  constructor() { }

  getUsers() {
    return this.users;
  }

  addUsers() {
    this.users.push("New String")
  }

  removeUser() {
    this.users.pop()
  }



}
