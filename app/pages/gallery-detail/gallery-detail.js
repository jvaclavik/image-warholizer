import {Page, NavController, NavParams, Slides} from 'ionic-angular';
import {GalleryProvider} from '../../providers/gallery-provider/gallery-provider';

@Page({
  templateUrl: 'build/pages/gallery-detail/gallery-detail.html',
  providers: [GalleryProvider]
})
export class GalleryDetailPage {
  static get parameters() {
    return [[NavController], [GalleryProvider], [NavParams]];
  }

  constructor(nav, galleryProvider, navParams) {
    this.nav = nav;
    this.gallery = galleryProvider.getGallery();
    this.slideOptions = {
      initialSlide: navParams.get("index")
    }
  }

  closeModal(){
    this.nav.pop();
  }
}
