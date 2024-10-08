import { Component, inject } from '@angular/core';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe, NgFor } from '@angular/common';
import { SvgIconComponent } from "../../common-ui/svg-icon/svg-icon.component";
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { PostFeedComponent } from "./post-feed/post-feed.component";


@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileHeaderComponent, AsyncPipe, SvgIconComponent, RouterLink, NgFor, ImgUrlPipe, PostFeedComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})

export class ProfilePageComponent {
  
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  
  me$ = toObservable(this.profileService.me);

  subscribers$ = this.profileService.getSubscriberShortList(5);


  profile$ = this.route.params
    .pipe(
      switchMap(({id}) => {
        if(id === 'me') {
          return this.me$;
        }
        return this.profileService.getAccount(id);
      }
    )
  ) 
  
  // Метод для проверки URL
  isCurrentUrl(url: string): boolean {
    return this.router.url === url;
  }
}
