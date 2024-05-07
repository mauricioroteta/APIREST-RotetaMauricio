import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private AuthService: AuthService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
  
  login(): void {
    this.AuthService.login(this.username, this.password).subscribe(
      (isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.loginError = true;
        }
      }
    );
  }
}
