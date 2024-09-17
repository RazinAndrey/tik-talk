import { Component, signal } from '@angular/core';
import { SvgIconComponent } from "../../../common-ui/svg-icon/svg-icon.component";
import { DndDirective } from '../../../common-ui/directives/dnd.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [SvgIconComponent, DndDirective, FormsModule],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent {

  preview  = signal<string>('/assets/imgs/avatar-placeholder.png');

  // для передачи на сервер
  avatar: File | null = null;

  // файл
  fileBrowserHandler(event: Event){

    const file = (event.target as HTMLInputElement)?.files?.[0];

    this.proccessFile(file);

  }

  // связываем dnd и файл
  onFileDroped(file: File){
    this.proccessFile(file);
  }

  proccessFile(file: File | null | undefined) {
    if(!file || !file.type.match('image')) return;

    const reader = new FileReader();

    // когда файл прогрузился браузером 
    reader.onload = (event) => {
      // закидываем в превью
      this.preview.set(event.target?.result?.toString() ?? '');
    }

    reader.readAsDataURL(file);
    this.avatar = file;
  }
}
