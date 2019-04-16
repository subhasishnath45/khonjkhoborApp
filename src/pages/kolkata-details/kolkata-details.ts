import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the KolkataDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-kolkata-details',
  templateUrl: 'kolkata-details.html',
})
export class KolkataDetailsPage {
  // following field will hold each kitchen post.
  public kolkataPost:any = [];
  private isLoading = false;
  public kolkataRelatedItems:any = [];
  private currentPostID:number;

  // initially showing 5 latest posts, 5 posts at a time
  private per_page:number = 4;
  // initially shows page 1
  private page:number = 1;

  constructor(public navCtrl: NavController, public api:ApiProvider, public navParams: NavParams) {

        // getting individual kitchen posts.
        this.kolkataPost= navParams.get('post');
        // getting individual kitchen posts ids.
       this.currentPostID = navParams.get('post').id;

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad KitchenDetailsPage');
    this.getRelatedKolkataPosts();
  }

  getRelatedKolkataPosts(){
    if(!this.isLoading){
      this.isLoading = true;
      this.api.get('AllKolkataPosts-api?_embed&per_page=' + this.per_page + '&page=' + this.page + '&exclude=' + this.currentPostID + '&categories=' + this.kolkataPost.categories[0]).subscribe((data:any) =>{
        this.isLoading = false;
        this.kolkataRelatedItems = data;
        
      },(error)=>{
        this.isLoading = false;
      });
    }
  }
  openKolkataDetails(kolkataitem){
    this.navCtrl.push(KolkataDetailsPage,{post: kolkataitem});
  }

}
