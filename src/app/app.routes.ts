import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LayoutMainComponent } from './shared/layouts/layout-main.component';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutMainComponent,
    children: [
      { path: '', component: SearchPageComponent },
      { path: 'profile', component: ProfilePageComponent },
    ],
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginPageComponent, canActivate: [noAuthGuard] },
];
