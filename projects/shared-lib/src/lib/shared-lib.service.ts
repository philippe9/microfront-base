import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedLibService {

  constructor() { }

  testShared() {
    return 'Arrival';
  }
}
