import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataStoreService } from '../services/data-store.service';
import { ContactForm } from '../interfaces/contact-form';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  contactForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    companyName: ['', Validators.required],
    typeOfBusiness: ['']  
  });

  constructor(private formBuilder: FormBuilder,
              private dataStoreService: DataStoreService) {

  }

  ngOnInit(): void {
    this.contactForm.controls['name'].markAsTouched();
    this.contactForm.controls['email'].markAsTouched();
    this.contactForm.controls['phoneNumber'].markAsTouched();
    this.contactForm.controls['companyName'].markAsTouched();
  }

  onSubmit(): void {
    if(this.contactForm.valid) {
      const userData = {
         name: this.contactForm.get('name')?.value,
         email: this.contactForm.get('email')?.value,
         phoneNumber: this.contactForm.get('phoneNumber')?.value,
         companyName: this.contactForm.get('companyName')?.value,
         typeOfBusiness: this.contactForm.get('typeOfBusiness')?.value         
      } as ContactForm;
      this.dataStoreService.save(userData);
      this.presentAlert();
    }
  }
  
  presentAlert(): void {
    const alertData = this.dataStoreService.load();
    const message = `Saved Information: \n
    Name: ${ alertData.name } \n
    Email: ${ alertData.email } \n 
    Phone Number: ${ alertData.phoneNumber } \n 
    Company Name: ${ alertData.companyName } \n 
    Type of Business: ${ alertData.typeOfBusiness }
    `;
    alert(message);
  }
}
