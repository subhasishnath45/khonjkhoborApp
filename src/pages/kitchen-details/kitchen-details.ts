import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
/**
 * Generated class for the KitchenDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-kitchen-details',
  templateUrl: 'kitchen-details.html',
})
export class KitchenDetailsPage {
  // following field will hold each kitchen post.
  public kitchenPost:any = [];
  private isLoading = false;
  public kitchenRelatedItems:any = [];
  private currentPostID:number;

  // initially showing 5 latest posts, 5 posts at a time
  private per_page:number = 4;
  // initially shows page 1
  private page:number = 1;

  constructor(public navCtrl: NavController, public api:ApiProvider, public navParams: NavParams) {
    // getting individual kitchen posts.
    this.kitchenPost= navParams.get('post');
     // getting individual kitchen posts ids.
    this.currentPostID = navParams.get('post').id;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad KitchenDetailsPage');
    this.getRelatedKitchenPosts();
  }

  getRelatedKitchenPosts(){
    if(!this.isLoading){
      this.isLoading = true;
      this.api.get('Allkitchenposts-api?_embed&per_page=' + this.per_page + '&page=' + this.page + '&exclude=' + this.currentPostID + '&categories=' + this.kitchenPost.categories[0]).subscribe((data:any) =>{
        this.isLoading = false;
        this.kitchenRelatedItems = data;
        
      },(error)=>{
        this.isLoading = false;
      });
    }
  }
  openKitchenDetails(kitchenitem){
    this.navCtrl.push(KitchenDetailsPage,{post: kitchenitem});
  }
}
