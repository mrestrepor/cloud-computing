import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = {
    username: '',
    password: '',
    repeatPassword: ''
  };

  onSubmit() {
    // Logic for registering the user
    console.log('Registering user:', this.registerForm);
  }
}
