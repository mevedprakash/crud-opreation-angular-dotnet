import {
  GoogleSigninButtonModule,
  SocialAuthService,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { error } from 'node:console';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-login',
  standalone: true,
  imports: [MatCardModule, GoogleSigninButtonModule, SocialLoginModule],
  templateUrl: './google-login.component.html',
  styleUrl: './google-login.component.css',
})
export class GoogleLoginComponent {
  socialAuthService = inject(SocialAuthService);
  name!: string;
  httpService = inject(HttpService);
  router = inject(Router);
  ngOnInit() {
    this.socialAuthService.authState.subscribe({
      next: (result) => {
        this.name = result.name;
        this.httpService.googleLogin(result.idToken).subscribe((res) => {
          if (res.token) {
            localStorage.setItem('token', res.token);
            this.router.navigateByUrl('/');
          }
        });
        console.log(result);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
