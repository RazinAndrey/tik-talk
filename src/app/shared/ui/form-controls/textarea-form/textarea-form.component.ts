import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-textarea-form',
  standalone: true,
  imports: [],
  templateUrl: './textarea-form.component.html',
  styleUrl: './textarea-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaFormComponent {}
