import { Component } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SvgIconComponent, NgFor],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuItems = [
    { 
      lable: 'My Page',
      icon: 'home',
      link: ''
    },
    {
      lable: 'Chats',
      icon: 'chats',
      link: 'chats'
    },
    {
      lable: 'Chats',
      icon: 'search',
      link: 'search'
    }
  ];
}
