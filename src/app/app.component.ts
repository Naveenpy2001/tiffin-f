import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,HomeComponent,ReactiveFormsModule,], // <-- Add this line
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
 
  

  title = 'Tiffino';
   isSidebarOpen = false;
   toggleclose = false;
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
   toggleclosin() {
    this.toggleclose = !this.toggleclose;
    this.isSidebarOpen = false;
  }
}
