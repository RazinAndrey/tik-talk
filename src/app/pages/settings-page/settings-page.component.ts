import { Component, effect, inject, ViewChild } from '@angular/core';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';
import { AvatarUploadComponent } from "./avatar-upload/avatar-upload.component";

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

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent;

  form = this.fb.group({
    firstName:['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value: '', disabled: true}, Validators.required],
    description: [''],
    stack: ['']
  });

  constructor() {
    effect(() => {
      this.form.patchValue({
        ...this.profileSevice.me(),
        stack:this.mergeStack(this.profileSevice.me()?.stack)
      });
    });
  }

  onSave(){
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if(this.form.invalid) return;

    console.log(this.avatarUploader.avatar);

    firstValueFrom(this.profileSevice.patchProfile({
      ...this.form.value,
      stack: this.splitStack(this.form.value.stack),      
    }));
  }

  splitStack(stack: string | null | string[] | undefined): string[]{
    if(!stack) return [];
    if(Array.isArray(stack)) return stack;
    
    return stack.split(','); 
  }

  mergeStack(stack: string | null | string[] | undefined){
    console.log(stack);
    if(!stack) return '';
    if(Array.isArray(stack)) return stack.join(',');
   
    return stack;
  }
}
