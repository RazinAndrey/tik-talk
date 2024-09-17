import { Component, effect, inject, ViewChild } from '@angular/core';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';
import { AvatarUploadComponent } from "./avatar-upload/avatar-upload.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [ProfileHeaderComponent, ReactiveFormsModule, AvatarUploadComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})

export class SettingsPageComponent {

  fb = inject(NonNullableFormBuilder);
  
  profileSevice = inject(ProfileService);

  router = inject(Router);

  // вынимаем все методы и поля AvatarUploadComponent
  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent;

  form = this.fb.group({
    firstName:['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value: '', disabled: true}, Validators.required],
    description: [''],
    stack: ['']
  });

  constructor() {
    // запускает каждый раз, когда сигнал поменяется 
    effect(() => {      
      // заполняем форму 
      this.form.patchValue({
        ...this.profileSevice.me(),
        // придет массив stack из бэка и мы его объединим в наш stack
        stack:this.mergeStack(this.profileSevice.me()?.stack)
      });
    });
  }

  onSave(){
    // проверка 
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if(this.form.invalid) return;

    if(this.avatarUploader.avatar){
      // обновляем картинку
      firstValueFrom(this.profileSevice.uploadAvatar(this.avatarUploader.avatar));
    }

    // обновляем аккаунт
    firstValueFrom(this.profileSevice.patchProfile({
      ...this.form.value,
      //  при вводе разделяем stack
      stack: this.splitStack(this.form.value.stack),      
    }));

    this.router.navigate(['profile/me']);
  }

  // разделить стек
  splitStack(stack: string | null | string[] | undefined): string[]{
    if(!stack) return [];
    if(Array.isArray(stack)) return stack;
    
    return stack.split(','); 
  }

  // достем стек
  mergeStack(stack: string | null | string[] | undefined){
    if(!stack) return '';
    if(Array.isArray(stack)) return stack.join(',');
   
    return stack;
  }
}
