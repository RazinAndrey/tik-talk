import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileChatsComponent } from './pages/profile-chats/profile-chats.component';
import { LayoutMainComponent } from './components/layouts/layout-main.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   component: LayoutMainComponent,
  //   children: [
  //     { path: 'search', component: ProfileSearchComponent },
  //     { path: 'settings', component: ProfileSettingsComponent },
  //     { path: 'profile', component: ProfileInfoComponent },
  //     { path: 'chats', component: ProfileChatsComponent },
  //   ],
  // },

  {
    path: '',
    component: LayoutMainComponent,
    children: [
      { path: '', component: SearchPageComponent },
      { path: '', component: ProfilePageComponent },
    ],
  },

  { path: 'login', component: LoginPageComponent },
];
