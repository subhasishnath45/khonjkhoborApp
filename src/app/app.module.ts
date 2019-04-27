import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Network } from '@ionic-native/network';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { KitchenDetailsPage } from '../pages/kitchen-details/kitchen-details';
import { KolkataDetailsPage } from '../pages/kolkata-details/kolkata-details';
import { KichenListingPage } from '../pages/kichen-listing/kichen-listing';
import {SearchPage} from '../pages/search/search';
import { ProfilePage } from '../pages/profile/profile';
import { MenuPage } from '../pages/menu/menu';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';
import { HttpClientModule } from '@angular/common/http';
import { TruncatePipe } from '../pipes/truncate/truncate';
import { AuthProvider } from '../providers/auth/auth';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    KichenListingPage,
    KitchenDetailsPage,
    KolkataDetailsPage,
    SearchPage,
    ProfilePage,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    KichenListingPage,
    KitchenDetailsPage,
    SearchPage,
    ProfilePage,
    KolkataDetailsPage
  ],
  providers: [
    StatusBar,
    Network,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    AuthProvider
  ]
})
export class AppModule {}
