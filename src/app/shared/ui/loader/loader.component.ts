import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type ThemeColorVar = '--light-color' | '--dark-color';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  readonly color = input<ThemeColorVar>('--light-color');
  readonly size = input<number>(1);

  protected readonly colorValue = computed(() => `var(${this.color()})`);
  protected readonly sizeValue = computed(() => `${this.size()}px`);
}
