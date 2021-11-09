import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {FormGroup} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  validatePersonalDetail(personalDetails:FormGroup): Observable<boolean> {
    return this.http
    .get<any>(`https://fakerapi.it/api/v1/custom?_quantity=1&result=boolean`)
    .pipe(map(res => res.data[0].result));
  }

  validateAddressDetail(addressDetails:FormGroup): Observable<boolean> {
    return this.http
    .get<any>(`https://fakerapi.it/api/v1/custom?_quantity=1&result=boolean`)
    .pipe(map(res => res.data[0].result));
  }

  validateEducationalDetail(educationalDetails:FormGroup): Observable<boolean> {
    return this.http
    .get<any>(`https://fakerapi.it/api/v1/custom?_quantity=1&result=boolean`)
    .pipe(map(res => res.data[0].result));
  }
}
