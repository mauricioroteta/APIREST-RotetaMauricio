import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PF-Roteta';

  private isDark = false;

  @HostBinding('class')
  get themeMode() {
    return this.isDark ? 'theme-dark' : 'theme-light';
  }

  switchMode(isDarkMode: boolean) {
    this.isDark = isDarkMode;
  }

}
