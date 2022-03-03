import { Injectable } from '@angular/core';
import { ContactForm } from '../interfaces/contact-form';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  constructor() { }

  public save(userData: ContactForm){
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  public load(){
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }
}
