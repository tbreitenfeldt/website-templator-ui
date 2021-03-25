import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  _error: any;

  constructor() {}

  get error() {
    return this._error;
  }

  set error(newError: any) {
    this._error = newError;
  }

  get errorMessage() {
    if (!this._error) {
      return '';
    }

    return this._error.error.message || this.error.statusText;
  }
}
