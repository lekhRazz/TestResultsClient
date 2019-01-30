import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared-service/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  errorMessage: '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.createForm();
  }
  get f() { return this.loginForm.controls; }

  createForm() {
    this.loginForm = this.formBuilder.group({
      'userName': ['', [Validators.minLength(5),Validators.maxLength(50),Validators.required]],
      'password': ['', [Validators.minLength(5),Validators.maxLength(255),Validators.required]]
    });
  }

  onSubmit() {
    console.log("you clicked sumbit button");
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.f.userName.value, this.f.password.value)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate([]);
        },
        error => {
            this.errorMessage = error;
        }
        );
  }
}
