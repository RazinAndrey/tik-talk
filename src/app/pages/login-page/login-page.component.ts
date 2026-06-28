import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { AuthService } from '../../core/api/auth.service';

type IFormLogin = {
  username: FormControl<string>;
  password: FormControl<string>;
};

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgOptimizedImage, ButtonComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  authService = inject(AuthService);

  formLogin = new FormGroup<IFormLogin>({
    username: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    password: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
  });

  onSubmit(): void {
    if (this.formLogin.valid) {
      this.authService.login(this.formLogin.getRawValue());
    }
  }
}
