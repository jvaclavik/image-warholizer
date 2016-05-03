import {Page, NavController, NavParams} from 'ionic-angular';
import {WarholizePage} from '../warholize/warholize';
import Cropper from 'cropperjs';
const BASE64_PREFIX = "data:image/jpeg;base64,";

@Page({
    templateUrl: 'build/pages/cropper/cropper.html',
})
export class CropperPage {
    static get parameters() {
        return [[NavController], [NavParams]];
    }
    constructor(nav, navParams) {
        this.nav = nav;
        this.navParams = navParams;
        var imageData = navParams.get('imageData');

        if (~imageData.indexOf(BASE64_PREFIX))
            this.imageData = imageData;
        else
            this.imageData = BASE64_PREFIX + imageData;
        setTimeout(() => {
            this.cropper = new Cropper(document.getElementById('cropper-img'), {
                aspectRatio: 1,
                viewMode: 2
            });
        });
    }
    getCroppedData() {
        var cropped = this.cropper.getCroppedCanvas({
            width: 500,
            height: 500
        });
        this.nav.push(WarholizePage, {imageData: cropped.toDataURL('image/jpeg')});
    }
}
