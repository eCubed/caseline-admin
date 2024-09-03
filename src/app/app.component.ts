import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { faBookOpen, faCircleInfo, faHome } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './services/auth.service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ToolbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'caseline-admin'
  faHome = faHome
  faCircleInfo = faCircleInfo
  faBookOpen = faBookOpen

  constructor(public authService: AuthService) {

  }
}
