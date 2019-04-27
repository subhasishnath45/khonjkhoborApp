import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, Platform, ToastController,Slides } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { TruncatePipe } from '../../pipes/truncate/truncate';
import { KitchenDetailsPage } from '../kitchen-details/kitchen-details';
import { KolkataDetailsPage } from '../kolkata-details/kolkata-details';
import { Network } from '@ionic-native/network';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { SearchPage } from '../search/search';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  // pipes: [TruncatePipe]
})
export class HomePage {
  // following variable will hold single kitchen item in home page
  public kitchenitems:any = [];
  public kolkataItems:any = [];
  public carouselItems:any = [];


  // initially showing 5 latest posts, 5 posts at a time
  private per_page:number = 5;
  // initially shows page 1
  private page:number = 1;
  private showLoadMore:boolean = false;
  private isLoading = false;
  private isLoading2 = false;
  private isLoadingKolkata = false;
  private LoggedinUsername:any;
@ViewChild('homeKitchenSlides') homeKitchenSlides:Slides;
@ViewChild('homeKolkataSlides') homeKolkataSlides:Slides;
@ViewChild('homeCarousel') homeCarousel:Slides;
@ViewChild('welcometxt') welcometxt:any;

  constructor(
    public navCtrl: NavController, 
    public api:ApiProvider,
    public api2:ApiProvider, 
    public apiKolkata:ApiProvider,
    public navParams:NavParams, 
    private network:Network,
    public alertCtrl:AlertController,
    public platform:Platform, 
    public toast:ToastController) {
    // watch network for a connection
    // this.network.onConnect().subscribe(()=>{
    //   this.toast.create({
    //     message : 'Network connected.',
    //     duration: 3000
    //   }).present();
    // });

    // this.network.onDisconnect().subscribe(()=>{
    //   this.toast.create({
    //     message : 'Network is disconnected.',
    //     duration: 3000
    //   }).present();
    // });

    // console.log(this.navParams.get('cat_id'));
    // following code is showing all kitchen posts by default in home page of the App.
    this.getKitchenPosts();
    this.getHomeCarousels();
    this.getKolkataPosts();
    this.LoggedinUsername = navParams.get('username');
    // console.log("tabspage param", this.LoggedinUsername);
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

  getKolkataPosts(){
    if(!this.isLoadingKolkata){
      this.isLoadingKolkata = true;
      // http://dlive.in/khobor/khonjkhobor/wp-json/wp/v2/Allkitchenposts-api?_embed&per_page=5&page=1
      this.apiKolkata.get('AllKolkataPosts-api?_embed&per_page=' + this.per_page + '&page=' + this.page).subscribe((data:any) =>{
        this.isLoadingKolkata = false;
        this.kolkataItems = this.kolkataItems.concat(data);
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
        this.isLoadingKolkata = false;
        if(error.error.code === "rest_post_invalid_page_number"){
          this.showLoadMore = false;
        }
      });
    }
  }

  getHomeCarousels(){
    if(!this.isLoading2){
      this.isLoading2 = true;
      // http://dlive.in/khobor/khonjkhobor/wp-json/wp/v2/Allkitchenposts-api?_embed&per_page=5&page=1
      this.api2.get('homeCarousel-api?_embed&per_page=' + this.per_page + '&page=' + this.page).subscribe((data:any) =>{
        this.isLoading2 = false;
        this.carouselItems = this.carouselItems.concat(data);
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
        this.isLoading2 = false;
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
  openKolkataDetails(kolkataItem){
    // 1st parameter is page name
    // 2nd parameter is post of type kitchenitem
    this.navCtrl.push(KolkataDetailsPage,{post: kolkataItem});
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
    this.getHomeCarousels();
    setInterval(()=>{
        document.getElementById("welcometxt").innerHTML = ''; 
    },5000);
    setInterval(()=>{
      if(this.homeCarousel.getActiveIndex() == this.homeCarousel.length() - 1){
        this.homeCarousel.slideTo(0);
      }
      this.homeCarousel.slideNext();
    },3000);
    setInterval(()=>{
      if(this.homeKitchenSlides.getActiveIndex() == this.homeKitchenSlides.length() - 1){
        this.homeKitchenSlides.slideTo(0);
      }
      this.homeKitchenSlides.slideNext();
    },5000);
    setInterval(()=>{
      if(this.homeKolkataSlides.getActiveIndex() == this.homeKolkataSlides.length() - 1){
        this.homeKolkataSlides.slideTo(0);
      }
      this.homeKolkataSlides.slideNext();
    },6000);
  }

  openSearchPage(){
    this.navCtrl.push(SearchPage);
  }
  
}
