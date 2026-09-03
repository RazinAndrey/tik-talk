import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFormComponent {}
