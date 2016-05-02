import {Page, NavController, NavParams, Slides} from 'ionic-angular';
import {GalleryProvider} from '../../providers/gallery-provider/gallery-provider';
import {ViewChild} from 'angular2/core';

/*
  Generated class for the GalleryDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/gallery-detail/gallery-detail.html',
  providers: [GalleryProvider]
})
export class GalleryDetailPage {
  //@ViewChild('gallerySlider') slider: Slides;

  static get parameters() {
    return [[NavController], [GalleryProvider], [NavParams]];
  }

  constructor(nav, galleryProvider, navParams) {
    this.nav = nav;
    this.gallery = galleryProvider.getGallery();
    //console.info("cc", navParams.get("index"));
    this.slideOptions = {
      initialSlide: navParams.get("index")
    };
    
    //this.slider.slideTo(navParams.get("index"), 0);


  }

  closeModal(){
    this.nav.pop();
  }
}
