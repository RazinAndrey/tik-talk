import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // решаем проблему с тем, что возможно не будет будет control при иницилизации, чтоб по итогу все раквно на него ссылаться
      useExisting: forwardRef(() => InputFormComponent),
      multi: true,
    },
  ],
})
export class InputFormComponent implements ControlValueAccessor {
  value: string | null = null;
  disabled = signal<boolean>(false);

  readonly id = input.required<string>();
  readonly title = input.required<string>();
  readonly placeholder = input.required<string>();
  readonly type = input.required<'text'>();

  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  // сюда приходит то, что программно мы создаем
  writeValue(value: string | null): void {
    this.value = value;
  }

  // отвечает за то, чтоб обновилась model через view
  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  // отвечает за то, чтоб понять тронули или нет input
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // отвечает за disabled или не disabled
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  // помогает view обновить model
  onModalChange(value: string | null): void {
    this.onChange(value);
  }

  // помогает понять тронули или нет input
  handleBlur(): void {
    this.onTouched();
  }
}
