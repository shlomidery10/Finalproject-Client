import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { GetLocationService } from 'app/get-location.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private getLocationService:GetLocationService,private router: Router)
  {
  //   if (this.authenticationService.currentUserValue) { 
  //     this.router.navigate(['/']);
  // }
   }

   ngOnInit() {
    this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
}
get f() { return this.registerForm.controls; }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;

this.getLocationService.register(this.registerForm.controls['username'].value,this.registerForm.controls['password'].value,this.registerForm.controls['firstName'].value,this.registerForm.controls['lastName'].value)
        .pipe(first())
        .subscribe(
            data => {
              console.log('Registration successful');
                              this.router.navigate(['/login']);
            },
            error => {
              console.log('error');
                this.loading = false;
            });
}
}

