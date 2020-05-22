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

  register()
  {
this.router.navigate(['register'])
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

get f() { return this.loginForm.controls; }

onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;

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




