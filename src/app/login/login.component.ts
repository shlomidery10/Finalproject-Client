import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'app/authentication.service';
import { User } from 'app/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { GetLocationService } from 'app/get-location.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  url:string=""
  
  constructor(private formBuilder: FormBuilder,private getLocationService:GetLocationService, private route: ActivatedRoute,private router: Router,private authenticationService: AuthenticationService) 
  {

    if (this.authenticationService.currentUserValue) 
    { 
      this.router.navigate(['/']);
  }

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

      if(localStorage.getItem("username")!=null)
      {
        this.router.navigate(['app']);
      }

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    // console.log(this.router.url);
    
    // var parts = this.router.url.split('/');
    // console.log(parts);

// this.route.url.subscribe(res=>{
//   console.log(res);
  
// })


this.getLocationService.login(this.f.username.value, this.f.password.value)
.subscribe((data) => {
    if (data) {
      localStorage.setItem("username",this.f.username.value);

      this.router.navigate(['app']);
    }
    else{
      alert("wrong userName or password")
      console.log("error");
      this.loading = false;
    }

    });
}

}




