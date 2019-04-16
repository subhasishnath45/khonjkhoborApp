import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

export interface pageInterface{
  // title: string;
  pageName: string;
  // tabComponent?: any;
  // index?: number;
  // icon: string;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  rootPage: any = HomePage;

  @ViewChild(Nav) nav: Nav;

  pages: pageInterface[] = [
    {pageName: 'KichenListingPage'},
    {pageName: 'HomePage'}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
  openPage(page:pageInterface){
    this.nav.setRoot(page.pageName);
  }
}
