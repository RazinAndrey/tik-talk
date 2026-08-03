import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-chats-page',
  standalone: true,
  imports: [],
  templateUrl: './chats-page.component.html',
  styleUrl: './chats-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsPageComponent {}
