import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponse, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  formInput: FormGroup;
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = '';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.formInput = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.formInput.valid) return;
    const { email, password } = this.formInput.value;
    this.isLoading = true;
    let authObservable: Observable<AuthResponse>;
    if (this.isLoginMode) {
      authObservable = this.authService.login({ password, email });
    } else {
      authObservable = this.authService.signUp({ password, email });
    }

    authObservable.subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.isLoading = false;
      },
    });
  }

  onHandleError() {
    this.error = '';
  }
}
