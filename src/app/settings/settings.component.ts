import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  constructor(private router: Router) {}

  notificationsEnabled = true;
  pauseSubscription = false;
  zeroCostDelivery = false;
  ecoPackaging = false;
  cutleryOptOut = false;
  darkMode = localStorage.getItem('theme') === 'dark';
  showPrivacyBox = false;
  showEditProfile = false;
  userName = localStorage.getItem('userName') || '';
  usermobile = localStorage.getItem('usermobile') || '';
  userPhoto: string | ArrayBuffer | null = localStorage.getItem('userPhoto');
  selectedLanguage = localStorage.getItem('lang') || 'en';
  notificationSound = false;
  selectedTimeZone = localStorage.getItem('timeZone') || 'Asia/Kolkata';
  regions: string[] = ['Jammu & Kashmir', 'Himachal Pradesh', 'Punjab', 'Andhra Pradesh', 'Andaman & Nicobar Islands'];
  timeZones: string[] = ['Asia/Kolkata', 'America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'];
  showMenu = false;

  @HostBinding('class.dark-theme') get isDarkTheme() {
    return this.darkMode;
  }

  ngOnInit() {
    this.loadSettings();
  }

  changeLanguage() {
    localStorage.setItem('lang', this.selectedLanguage);
    window.location.reload();
  }

  toggleTheme() {
    localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
  }

  togglePrivacyBox() {
    this.showPrivacyBox = !this.showPrivacyBox;
  }

  toggleEditProfile() {
    this.showEditProfile = !this.showEditProfile;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.userPhoto = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile() {
    if (!this.userName.trim()) {
      alert('Name cannot be empty.');
      return;
    }
    localStorage.setItem('userName', this.userName);
    localStorage.setItem('usermobile', this.usermobile);
    if (typeof this.userPhoto === 'string') {
      localStorage.setItem('userPhoto', this.userPhoto);
    }
    this.toggleEditProfile();
  }

  saveSettings() {
    const settings = {
      notificationsEnabled: this.notificationsEnabled,
      pauseSubscription: this.pauseSubscription,
      zeroCostDelivery: this.zeroCostDelivery,
      ecoPackaging: this.ecoPackaging,
      cutleryOptOut: this.cutleryOptOut,
      notificationSound: this.notificationSound,
      selectedTimeZone: this.selectedTimeZone
    };
    localStorage.setItem('userSettings', JSON.stringify(settings));
  }

  loadSettings() {
    const saved = JSON.parse(localStorage.getItem('userSettings') || '{}');
    this.notificationsEnabled = saved.notificationsEnabled ?? true;
    this.pauseSubscription = saved.pauseSubscription ?? false;
    this.zeroCostDelivery = saved.zeroCostDelivery ?? false;
    this.ecoPackaging = saved.ecoPackaging ?? false;
    this.cutleryOptOut = saved.cutleryOptOut ?? false;
    this.notificationSound = saved.notificationSound ?? false;
    this.selectedTimeZone = saved.selectedTimeZone ?? 'Asia/Kolkata';
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    localStorage.clear();
    confirm('Are you sure You to want Logout ');
    this.router.navigate(['/login']);
  }

  goToOrders() {
    alert('Redirect to Orders');
  }

  goToHelp() {
    alert('Redirect to Help');
  }
}