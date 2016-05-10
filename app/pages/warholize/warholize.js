import {Page, NavController, NavParams, Loading, ActionSheet} from 'ionic-angular';
import {SocialSharing} from 'ionic-native';
import {Warholizer} from './warholizer';
import {GalleryProvider} from '../../providers/gallery-provider/gallery-provider';
import {Utility} from '../../utility';
const BASE64_PREFIX = "data:image/jpeg;base64,";

@Page({
    templateUrl: 'build/pages/warholize/warholize.html',
    providers: [GalleryProvider]
})
export class WarholizePage {
    static get parameters() {
        return [[NavController], [NavParams], [GalleryProvider]];
    }

    constructor(nav, navParams, gallery) {
        this.nav = nav;
        this.generated = false;
        this.gallery = gallery;
        this.imgSrc = 'img/demo.jpg'; //default image
        var imageData = navParams.get('imageData');
        if (imageData) {
            this.useNewImageAsSrc(imageData);
        }
    }
	
	isElectron(){
		return Utility.isElectron();
	}


    /**
     * @description Generates clones of source image with applied effects
     */
    applyEffect(orientation) {
        if (this.generated) return;
        let loading = Loading.create({
            content: 'Working hard...'
        });
        let wrh = new Warholizer({
            previewsElemId: 'previews',
            sourceImgId: 'source-image',
            resultWrapperNameBase: 'result-wrapper-',
            resultElementNameBase: 'result-',
            orientation: orientation,
            onRenderStart: () => {
                this.nav.present(loading);
            },
            onRenderFinished: () => {
                loading.dismiss();
				if(Utility.isElectron()){
					var canvases = document.querySelectorAll('canvas');
					for(var i = 0; i < canvases.length; i++){
						var parent = canvases[i].parentElement;
						if(parent.id == 'previews'){
							var a = document.createElement('a');
							a.href = canvases[i].toDataURL('image/jpeg');
							a.download = 'stripes.jpg';
							a.appendChild(canvases[i]);
							parent.appendChild(a);
						}
					}
				}
            },
            cloneClickedHandler: (target) => {
				if(Utility.isElectron()){
					window.open(target.toDataURL('image/png'));	
				} else {
					this.showActionSheet(target);
				}
            }
        });
        wrh.generateClones();
        this.generated = true;
    }

    showActionSheet(target) {
        let sheet = ActionSheet.create({
            title: 'Action?',
            buttons: [
                {
                    text: 'Share',
                    handler: () => {
                        SocialSharing.share(
                            'See this picture!', 'My warholized photo',
                            target.toDataURL('image/jpeg')
                        );
                    }
                }, {
                    text: 'Save',
                    handler: () => {
                        this.gallery.savePhoto(target);
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        this.nav.present(sheet);
    }

    /**
     * @description Generates image element as a result of camera operation
     * @param {String} String containing base64 reperesentation of the taken picture
     */
    useNewImageAsSrc(imageData) {
        if (~imageData.indexOf(BASE64_PREFIX))
            this.imgSrc = imageData;
        else
            this.imgSrc = BASE64_PREFIX + imageData;
    }
}
