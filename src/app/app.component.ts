import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';ProfilePage
import { ProfilePage } from '../pages/profile/profile';
import { KichenListingPage } from '../pages/kichen-listing/kichen-listing';
import { MenuPage } from '../pages/menu/menu';
// import { ListPage } from '../pages/list/list';
import { ApiProvider } from '../providers/api/api';

export interface pageInterface{
  // title: string;
  pageName: string;
  // tabComponent?: any;
  categoryID: number;
  // icon: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // rootPage: any = HomePage;
  rootPage: any = ProfilePage;
  pages: pageInterface[] = [
    {pageName: 'KichenListingPage',categoryID:24}
    // {pageName: 'HomePage'}
  ];
  // pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              public api:ApiProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'Home', component: HomePage },
    //   { title: 'List', component: ListPage }
    // ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.api.getCategories();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(cat_id:number = 0,page:pageInterface) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(HomePage, {cat_id: cat_id});
    if(cat_id == 24){
      this.nav.setRoot(KichenListingPage);
    }else if(cat_id == 2){
      this.nav.setRoot(KichenListingPage);
    }else{
      this.nav.setRoot(HomePage, {cat_id: cat_id});
    }
  }
}
