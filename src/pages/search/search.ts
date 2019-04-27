import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Network } from '@ionic-native/network';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  searchQuery:string = '';
  public searchItems:any = [];
  private per_page:number = 10;
  // initially shows page 1
  private page:number = 1;
  private showLoadMore:boolean = false;
  private isLoading = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api:ApiProvider,
    private network:Network
    ) {
  }
  onSearch(){
    // console.log(this.searchQuery);
    this.searchItems = [];
    this.getSearchPosts();
    // if(this.searchQuery == ''){
    //   this.showLoadMore = false;
    // }
  }
  getSearchPosts(){
    if(!this.isLoading && this.searchQuery.length > 0){
      this.isLoading = true;
      // http://dlive.in/khobor/khonjkhobor/wp-json/wp/v2/Allkitchenposts-api?_embed&per_page=5&page=1
      this.api.get('all-data?per_page=' + this.per_page + '&page=' + this.page + '&search=' + this.searchQuery).subscribe((data:any) =>{
        this.isLoading = false;
        this.searchItems = this.searchItems.concat(data);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  clearSearch(){
    console.log('clear Search tapped');
    this.searchQuery='';
    this.searchItems = [];
    this.page = 1;
    this.showLoadMore = false;
    
  }
}
