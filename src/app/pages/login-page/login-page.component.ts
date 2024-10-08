import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})

export class LoginPageComponent {
  
  authService = inject(AuthService);
  router = inject(Router);

  isPasswordVisible = signal<boolean>(false);
  
  form = new FormGroup({
    username: new FormControl<string | null>('razzz1n', Validators.required),
    password: new FormControl<string | null>('dGh7UVIkU1', Validators.required)
  })

  constructor(){}

  onSubmit(){
      this.authService.login({
        password: this.form.value.password ?? null, 
        username: this.form.value.username ?? null})
      ?.subscribe((result) => {
          this.router.navigate(['']);
          console.log(result);
        }
      );
  }
}
