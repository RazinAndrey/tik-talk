import { Component, inject } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { SubscriberCardComponent } from "./subscriber-card/subscriber-card.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SvgIconComponent, NgFor, SubscriberCardComponent, RouterLink, AsyncPipe, JsonPipe, ImgUrlPipe, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuItems = [
    { 
      lable: 'My Page',
      icon: 'home',
      link: 'profile/me'
    },
    
    {
      lable: 'Chats',
      icon: 'chats',
      link: 'chats'
    },
    {
      lable: 'Search',
      icon: 'search',
      link: 'search'
    },

  ];

  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscriberShortList();

  me = this.profileService.me;

  ngOnInit(){
    firstValueFrom(this.profileService.getMe());
  }
}
