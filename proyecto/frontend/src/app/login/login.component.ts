import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: any = {}; // Object to hold form data

  constructor(private router: Router){}

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Perform login logic here
      console.log('Logging in...');
      console.log(this.loginForm); // Access form data here
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
