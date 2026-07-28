import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-profile-chats',
  standalone: true,
  imports: [],
  templateUrl: './profile-chats.component.html',
  styleUrl: './profile-chats.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileChatsComponent {}
