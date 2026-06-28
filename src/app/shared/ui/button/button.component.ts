import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'button[app-button], a[app-button]',
  standalone: true,
  template: `
    @if (loading()) {
      <span class="btn-spinner" aria-hidden="true"></span>
    }
    <ng-content />
  `,
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"btn-" + variant()',
    '[class.btn-icon]': 'icon()',
    '[class.btn-loading]': 'loading()',
    '[attr.disabled]': 'isDisabled()',
    '[attr.aria-disabled]': 'isDisabled()',
    '[attr.aria-busy]': 'loading()',
  },
})
export class ButtonComponent {
  readonly variant = input<'primary' | 'outline' | 'outline-purple'>('primary');
  readonly icon = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });

  protected readonly isDisabled = computed((): boolean | null => this.disabled() || this.loading() || null);
}
