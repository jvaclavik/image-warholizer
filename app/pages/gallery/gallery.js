import {Page, Modal, NavController} from 'ionic-angular';
import {GalleryDetailPage} from '../gallery-detail/gallery-detail';
import {GalleryProvider} from '../../providers/gallery-provider/gallery-provider';


@Page({
    templateUrl: 'build/pages/gallery/gallery.html',
    providers: [GalleryProvider]
})
export class GalleryPage {
    static get parameters(){
        return [[NavController], [GalleryProvider]]
    }
    constructor(nav, galleryProvider){
        this.gallery = galleryProvider.getGallery();
        console.info(this.gallery);
        this.nav = nav;
    }

    showImages(index){
        let modal = Modal.create(GalleryDetailPage, {index: index});
        this.nav.present(modal);
    }
}
