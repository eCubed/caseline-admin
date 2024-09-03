import { Component, effect } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayerDirective } from '../../directives/overlayer.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OverlayerDirective
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(public authService: AuthService, 
              private router: Router,
              private fb: FormBuilder) {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    effect(() => {
      if (this.authService.tokenResponse())
        this.router.navigate(['/admin'])
      else
        console.log('Not navigating to admin because tokenResponse is null')
    })
  }

 
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
    }
  }
}
