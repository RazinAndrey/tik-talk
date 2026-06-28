import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-skill-tag',
  standalone: true,
  template: '{{ tag() }}',
  styleUrl: './skill-tag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.active-tag]': 'active()',
  },
})
export class SkillTagComponent {
  readonly tag = input.required<string>();
  readonly active = input(false, { transform: booleanAttribute });
}
