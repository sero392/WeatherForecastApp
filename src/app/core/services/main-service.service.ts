import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  loading = signal(false);

  constructor() { }

  showLoading(){
    this.loading.set(true);
  }

  hideLoading(){
    this.loading.set(false);
  }
}
