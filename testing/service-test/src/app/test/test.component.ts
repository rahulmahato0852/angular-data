import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

  constructor(private userService: UserService) { }


  users: string[] = []


  ngOnInit(): void {
    this.users = this.userService.getUsers()
  }



  addUsers() {
    this.userService.addUsers()
  }






}
