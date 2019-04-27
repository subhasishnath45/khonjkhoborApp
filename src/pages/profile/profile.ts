import { Component } from '@angular/core';
// import { Input, List, Slides } from 'ionic-angular';
import {IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  username:any;
  password:any;
  jsonObj:any;
  public sendingUsername:any;
  // model:any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,private authProvider:AuthProvider) {
    if(localStorage.getItem('wpIonicToken')){
      this.jsonObj = JSON.parse(localStorage.getItem('wpIonicToken'))
      this.username = this.jsonObj["user_display_name"];
      // this.username = localStorage.getItem('wpIonicToken');
      this.sendingUsername = this.username.toString();
      this.navCtrl.setRoot(HomePage,{username:this.sendingUsername});
      // this.navCtrl.push(HomePage,this.username);
    }
  }
  onLogin(){
    console.log(this.username, this.password);
    this.authProvider.postLogin(this.username,this.password).subscribe(data => {
      console.log(data);
      localStorage.setItem('wpIonicToken',JSON.stringify(data));
      
    });

  }
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ProfilePage');
  // }

}
