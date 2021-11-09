import { Component , OnInit, HostListener } from '@angular/core';
import { FormGroup,Validators,FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  getScreenWidth: any;
  getScreenHeight: any;

  personalDetails!: FormGroup;
  addressDetails!: FormGroup;
  educationalDetails!: FormGroup;
  personal_step = false;
  address_step = false;
  education_step = false;
  step = 1;

  constructor(private formBuilder: FormBuilder, private appService: AppService) { }

  ngOnInit() {
        this.getScreenWidth = window.innerWidth;
        this.getScreenHeight = window.innerHeight;

        this.personalDetails = this.formBuilder.group({
            name: ['', Validators.required,[(control: AbstractControl):Observable<ValidationErrors | null> => this.validatePersonalDetail(control)]],
            email: ['', [Validators.required,Validators.email],[(control: AbstractControl):Observable<ValidationErrors | null> => this.validatePersonalDetail(control)]],
        });
        this.addressDetails = this.formBuilder.group({
            city: ['', Validators.required,[(control: AbstractControl):Observable<ValidationErrors | null> => this.validateAddressDetail(control)]],
            address: ['', Validators.required,[(control: AbstractControl):Observable<ValidationErrors | null> => this.validateAddressDetail(control)]],
        });
        this.educationalDetails = this.formBuilder.group({
            university: ['', Validators.required,[(control: AbstractControl):Observable<ValidationErrors | null> => this.validateEducationalDetail(control)]],
        });
  }

  @HostListener('window:resize', ['$event'])

  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  get personal() { return this.personalDetails.controls; }
  get education() { return this.educationalDetails.controls; }
  get address() { return this.addressDetails.controls; }

  validatePersonalDetail(control: AbstractControl): Observable<ValidationErrors | null >  {
    return this.appService.validatePersonalDetail(control.value)
    .pipe(map(response => {
      console.log(response);
      if(response) {
        return null;
      } else {
        return {'invalid':true};
      }
    }));
  }

  validateAddressDetail(control: AbstractControl): Observable<ValidationErrors | null > {
    return this.appService.validateAddressDetail(control.value)
    .pipe(map(response => {
      console.log(response);
      if(response) {
        return null;
      } else {
        return {'invalid':true};
      }
    }));
  }

  validateEducationalDetail(control: AbstractControl): Observable<ValidationErrors | null > {
    return this.appService.validateEducationalDetail(control.value)
    .pipe(map(response => {
      console.log(response);
      if(response) {
        return null;
      } else {
        return {'invalid':true};
      }
    }));
  }

  next(){
    if(this.step==1){
          this.personal_step = true;
          if (this.personalDetails.invalid) { return  }
          this.step++
    }
    if(this.step==2){
        this.address_step = true;
        if (this.addressDetails.invalid) { return }
            this.step++;
    }
  }

  previous(){
    this.step--
    if(this.step==1){
      this.personal_step = false;
    }
    if(this.step==2){
      this.education_step = false;
    }
  }

  submit(){
    if(this.step==3){
      this.education_step = true;
      if (this.educationalDetails.invalid) { return }
    }
  }
}
