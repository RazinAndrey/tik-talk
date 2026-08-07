import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

type SvgIconDirectory = 'navbar' | '';

@Component({
  selector: 'svg[icon]',
  standalone: true,
  imports: [],
  template: '<svg:use [attr.href]="href()" />',
  styles: [''],
  host: {
    '[attr.width]': 'width() ? width() : 14',
    '[attr.height]': 'height() ? height() : 14',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent {
  readonly icon = input.required<string>();
  readonly directory = input<SvgIconDirectory>('');
  readonly width = input<number | string>();
  readonly height = input<number | string>();

  readonly href = computed(() => {
    const path = this.directory() ? `${this.directory()}/${this.icon()}` : this.icon();
    return `assets/icons/${path}.svg#${this.icon()}`;
  });
}
