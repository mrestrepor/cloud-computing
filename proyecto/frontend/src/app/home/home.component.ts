import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';

interface Message {
  content: string;
  user: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  messages: string = '';
  newMessage: string = '';
  isMessageSent: boolean = false;
  imageUrls: string[] = [];

  constructor(private backendService: BackendService, private router: Router) {}

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.backendService.sendMessage(this.newMessage).subscribe(
        (response) => {
          console.log('Response:', response);
          this.imageUrls = response.urls;
        },
        (error) => {
          console.log('Error:', error);
        }
      );
      this.isMessageSent = true;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
