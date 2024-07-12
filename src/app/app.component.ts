import { Component } from '@angular/core';
// import { ToastrService, IndividualConfig } from 'ngx-toastr';
// import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // animations: [
  //   trigger('flyInOut', [
  //     transition(':enter', [
  //       style({ transform: 'translateX(-100%)' }),
  //       animate('300ms', style({ transform: 'translateX(0)' }))
  //     ]),
  //     transition(':leave', [
  //       animate('300ms', style({ transform: 'translateX(100%)' }))
  //     ])
  //   ]),
  //   trigger('buttonState', [
  //     transition('void => *', [
  //       style({ transform: 'scale(0)' }),
  //       animate('300ms', style({ transform: 'scale(1)' }))
  //     ])
  //   ])
  // ]
})
export class AppComponent {
  title = 'toastrr';

  // constructor(private toastr: ToastrService) {}

  // showToast() {
  //   const toastConfig: Partial<IndividualConfig> = {
  //     timeOut: 3000,
  //     closeButton: true,
  //     progressBar: true,
  //     progressAnimation: 'increasing'
  //   };

  //   const toastRef = this.toastr.success('Login successful!', 'Success', toastConfig);

  //   toastRef.onShown.subscribe(() => {
  //     const buttonElement = document.getElementById(`toast-${toastRef.toastId}-button`);
  //     if (buttonElement) {
  //       buttonElement.classList.add('animate-button');
  //     }
  //   });
  // }

  // showErrorToast() {
  //   const toastConfig: Partial<IndividualConfig> = {
  //     timeOut: 3000,
  //     closeButton: true,
  //     progressBar: true,
  //     progressAnimation: 'increasing'
  //   };

  //   this.toastr.error('An error occurred.', 'Error', toastConfig);
  // }
}
