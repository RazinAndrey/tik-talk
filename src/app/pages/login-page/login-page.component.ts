import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { delay, from, map, take, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})

export class LoginPageComponent {
  
  authService = inject(AuthService);
  router = inject(Router);

  form = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required)
  })

  constructor(){
    // RxJS
   from([1, 2, 3]).pipe(
    map(v => v * 2),
    take(1),
    delay(1000)
   ).subscribe(v => console.log(v));
  }

  onSubmit(){
    if(this.form.valid){
      // @ts-ignore
      this.authService.login(this.form.value)
      .subscribe((result) => {
          this.router.navigate(['']);
          console.log(result);
        }
      );
    }
  }
}
