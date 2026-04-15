import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProfileSearchComponent } from './pages/profile-search/profile-search.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
import { ProfileInfoComponent } from './pages/profile-info/profile-info.component';
import { ProfileChatsComponent } from './pages/profile-chats/profile-chats.component';
import { LayoutMainComponent } from './components/layouts/layout-main.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutMainComponent,
    children: [
      { path: 'search', component: ProfileSearchComponent },
      { path: 'settings', component: ProfileSettingsComponent },
      { path: 'profile', component: ProfileInfoComponent },
      { path: 'chats', component: ProfileChatsComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
];
