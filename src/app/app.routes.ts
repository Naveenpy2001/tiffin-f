
import { ContactComponent } from './contact/contact.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CuisinesComponent } from './cuisines/cuisines.component';
import { SubscriptionComponent } from './subscriptions/subscriptions.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AccountRegistrationComponent } from './account-registration/account-registration.component';
import { ForgatePasswordComponent } from './forgate-password/forgate-password.component';
import { AddTocartComponent } from './add-tocart/add-tocart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { SubscriptionsComponent } from './delivery/subscription/subscription.component';
import { FoodcartComponent } from './foodcart/foodcart.component';
import { MembershipPlanComponent } from './membership-plan/membership-plan.component';

import { ReactiveFormsModule } from '@angular/forms';

import  {ReviewRatingComponent} from './Rating-Review/review-list.component';
import { PaymentcheckoutpageComponent } from './paymentcheckoutpage/paymentcheckoutpage.component';
import { OffersRewardsComponent } from './offers-rewards/offers-rewards.component';
import {paymentComponent} from './payment/payment.component';
import { SettingsComponent } from './settings/settings.component';
import { authGuard } from './sharingdata/guard/auth.guard';
import { ChangePasswordComponent } from './forgotpassword/forgotpasswordlogin.component';
import {DeliveryPartnerComponent } from './delivery/delivery.component';
import { MenuComponent } from './menu/menu.component';
export const routes: Routes = [
  {path:'checkpayment',component:PaymentcheckoutpageComponent},
  {path:'review',component:ReviewRatingComponent},
{path:'subplan',component:SubscriptionsComponent},
{path:'menu',component:MenuComponent},
  { path: 'subscriptions', component: SubscriptionComponent ,canActivate:[authGuard]},
  { path: 'profile', component: ProfileComponent,canActivate:[authGuard] },
{path:'contact',component:ContactComponent},
{path: 'Account-Registration',component: AccountRegistrationComponent},
{path: 'forgate-password',component : ForgatePasswordComponent},
{path: 'foodcart',component : FoodcartComponent,canActivate:[authGuard]},
{path: 'MembershipPlan',component : MembershipPlanComponent},
{path:'addtocart',component:AddTocartComponent,canActivate:[authGuard]},
{path:'wishlist',component:WishlistComponent,canActivate:[authGuard]},
{path:'offers',component:OffersRewardsComponent,canActivate:[authGuard]},
{path:'payment',component:paymentComponent,canActivate:[authGuard]},
{path:'settings',component:SettingsComponent},
{path:'changepassword',component:ChangePasswordComponent},
{path:'delivery',component:DeliveryPartnerComponent},

{
    path: '',
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'admin-login',
    loadComponent: () =>
      import('./admin-login/admin-login.component').then(m => m.AdminLoginComponent)
  },
  {
    path: 'cuisines',
    loadComponent: () =>
      import('./cuisines/cuisines.component').then(m => m.CuisinesComponent)
  },
];
