import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatapassService } from 'src/app/services/datapass.service';
// import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('flyInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('buttonState', [
      transition('void => *', [
        style({ transform: 'scale(0)' }),
        animate('300ms', style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class RegisterComponent implements OnInit {
  reactiveForm: FormGroup;
  form_status: boolean;
  year: number;
  tempval: any;

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private detailss:DatapassService,
    private toastr: ToastrService,
    private router: Router
    ) {
    this.reactiveForm = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [this.confirmValidator]],
    });
    this.form_status = false;
    this.year = new Date().getFullYear();
  }

  ngOnInit() {}

  postdata(reactiveForm: FormGroup) {
    this.form_status = true;
    if (reactiveForm.valid) {
      // Perform registration logic here
      console.log(reactiveForm.value);
      // Reset form after successful registration
      this.tempval = {
        name:reactiveForm.value.name,
        username: reactiveForm.value.username,
        password: reactiveForm.value.password,
        confirmpassword: reactiveForm.value.confirmPassword,
      };
      console.log(this.tempval);
  
      this.detailss.store_user_data(this.tempval).subscribe(
        (response: any) => {
          console.log('Registration successful:', response);
          // Reset form after successful registration
          this.form_status = false;

          const toastConfig: Partial<IndividualConfig> = {
            timeOut: 1500,
            closeButton: true,
            progressBar: true,
            progressAnimation: 'decreasing'
          };
          const toastRef = this.toastr.success('Registration successful!', 'Success', toastConfig);
          toastRef.onHidden.subscribe(() => {
            this.router.navigate(['/auth/login']);
          });
          reactiveForm.reset();


        },
        (error: any) => {
          this.form_status = false;
          console.log('Registration failed:', error);
          // Handle the error response here
          if (error && error.error && error.error.message) {

            const toastConfig: Partial<IndividualConfig> = {
              timeOut: 1500,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'decreasing'
            };
            this.toastr.error( error.error.message, 'Error', toastConfig);
            console.log('Error message:', error.error.message);
          }
        }
      );
      reactiveForm.reset();
    } else {
      // Form validation failed
      console.log('Invalid form');
    }
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } | null => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (this.reactiveForm && this.reactiveForm.controls['password'].value !== control.value) {
      return { error: true, confirm: true };
    }
    return null;
  };
}
