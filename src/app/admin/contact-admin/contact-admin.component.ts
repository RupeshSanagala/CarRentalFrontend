import { CommonModule } from '@angular/common';
import { Contact } from './../../components/contact/contact.component';
import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-admin',
  imports:[CommonModule],
  templateUrl: './contact-admin.component.html',
  styleUrls: ['./contact-admin.component.css'],
})
export class ContactAdminComponent implements OnInit {
  contacts: Contact[] = [];
  isLoading = true;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.fetchContacts();
  }

  fetchContacts(): void {
    this.contactService.getAllContacts().subscribe(
      (data) => {
        this.contacts = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching contacts', error);
        this.isLoading = false;
      }
    );
  }
}
