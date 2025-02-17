import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-support',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-support.component.html',
  styleUrls: ['./user-support.component.css']
})
export class UserSupportComponent {
  message = '';

  sendSupportMessage() {
    alert(`Support message sent: ${this.message}`);
    this.message = '';
  }
}
