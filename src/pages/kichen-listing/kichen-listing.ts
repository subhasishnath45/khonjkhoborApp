import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavController, NavParams, AlertController, Platform, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { TruncatePipe } from '../../pipes/truncate/truncate';
import { KitchenDetailsPage } from '../kitchen-details/kitchen-details';
import { Network } from '@ionic-native/network';
import { errorHandler } from '@angular/platform-browser/src/browser';

/**
 * Generated class for the KichenListingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-kichen-listing',
  templateUrl: 'kichen-listing.html',
})
export class KichenListingPage {
  // following variable will hold single kitchen item in home page
  public kitchenitems:any = [];
  // initially showing 5 latest posts, 5 posts at a time
  private per_page:number = 5;
  // initially shows page 1
  private page:number = 1;
  private showLoadMore:boolean = false;
  private isLoading = false;
  constructor(public navCtrl: NavController, public api:ApiProvider, public navParams:NavParams, private network:Network,public alertCtrl:AlertController,public platform:Platform, public toast:ToastController) {

    this.network.onConnect().subscribe(()=>{
      this.toast.create({
        message : 'Network connected.',
        duration: 3000
      }).present();
    });

    this.network.onDisconnect().subscribe(()=>{
      this.toast.create({
        message : 'Network is disconnected.',
        duration: 3000
      }).present();
    });

    console.log(this.navParams.get('cat_id'));
    // following code is showing all kitchen posts by default in home page of the App.
    this.getKitchenPosts();

  }
  getKitchenPosts(){
    if(!this.isLoading){
      this.isLoading = true;
      // http://dlive.in/khobor/khonjkhobor/wp-json/wp/v2/Allkitchenposts-api?_embed&per_page=5&page=1
      this.api.get('Allkitchenposts-api?_embed&per_page=' + this.per_page + '&page=' + this.page).subscribe((data:any) =>{
        this.isLoading = false;
        this.kitchenitems = this.kitchenitems.concat(data);
        // data.length will tell us how many json objects are there in our json array.
        // this.per_page is 5 here
        // if No of json objects === 5 then don't show load more button.
        if(data.length === this.per_page){
          this.page++;
          this.showLoadMore = true;
        }else{
          this.showLoadMore = false;
        }
        
      },(error)=>{
        this.isLoading = false;
        if(error.error.code === "rest_post_invalid_page_number"){
          this.showLoadMore = false;
        }
      });
    }
  }

  openKitchenDetails(kitchenitem){
    // 1st parameter is page name
    // 2nd parameter is post of type kitchenitem
    this.navCtrl.push(KitchenDetailsPage,{post: kitchenitem});
  }

  getCatName(cat_id:number):string{
    let cat_name:string = '';
    this.api.Categories.forEach(element => {
      if(element.id == cat_id){
        cat_name = element.name;
      }
    });
    return cat_name;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad KichenListingPage');
  }

}
