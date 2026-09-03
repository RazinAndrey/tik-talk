import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LayoutMainComponent } from './shared/layouts/layout-main.component';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';
import { ChatsPageComponent } from './pages/chats-page/chats-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutMainComponent,
    children: [
      { path: '', redirectTo: 'search', pathMatch: 'full' },

      { path: 'profile/:id', component: ProfilePageComponent, title: 'Профиль' },
      { path: 'chats', component: ChatsPageComponent, title: 'Чаты' },
      { path: 'search', component: SearchPageComponent, title: 'Поиск' },
      { path: 'settings', component: SettingsPageComponent, title: 'Настройки' },
    ],
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginPageComponent, canActivate: [noAuthGuard] },
];
