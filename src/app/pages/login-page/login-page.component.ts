import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { AuthService } from '../../core/api/auth.service';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../shared/ui/loader/loader.component';

type FormLogin = {
  username: FormControl<string>;
  password: FormControl<string>;
};

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgOptimizedImage, ButtonComponent, LoaderComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  readonly isLoading = signal<boolean>(false);
  readonly isPasswordVisible = signal<boolean>(false);

  formLogin = new FormGroup<FormLogin>({
    username: new FormControl<string>('razzz1n', { nonNullable: true, validators: Validators.required }),
    password: new FormControl<string>('dmk9BKuYhw', { nonNullable: true, validators: Validators.required }),
  });

  onSubmit(): void {
    if (this.formLogin.valid) {
      this.isLoading.set(true);

      this.authService.loginForAccessToken(this.formLogin.getRawValue()).subscribe(() => {
        this.router.navigate(['']);
        this.isLoading.set(false);
      });
    }
  }
}
