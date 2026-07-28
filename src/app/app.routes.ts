import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LayoutMainComponent } from './components/layouts/layout-main.component';
import { canActiveAuth } from './core/guards/access.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutMainComponent,
    children: [
      { path: '', component: SearchPageComponent },
      { path: 'profile', component: ProfilePageComponent },
    ],
    // canActivate: [canActiveAuth],
  },

  { path: 'login', component: LoginPageComponent },
];
