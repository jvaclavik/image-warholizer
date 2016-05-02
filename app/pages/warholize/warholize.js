import {Page, NavController, NavParams, Loading} from 'ionic-angular';
import {SocialSharing} from 'ionic-native';
import {Warholizer} from './warholizer';

const BASE64_PREFIX = "data:image/jpeg;base64,";

@Page({
    templateUrl: 'build/pages/warholize/warholize.html'
})
export class WarholizePage {
	static get parameters(){
		return [[NavController], [NavParams]];	
	}
	
    constructor(nav, navParams){
		this.nav = nav;
		this.generated = false;
		this.imgSrc = 'img/demo.jpg'; //default image
		var imageData = navParams.get('imageData');
		if(imageData){
			this.useNewImageAsSrc(imageData);	
		}
    }
	
	/**
	 * @description Generates clones of source image with applied effects
	 */
	applyEffect(orientation){
		if(this.generated) return;
		let loading = Loading.create({
			content: 'Tvrdě makám...'
		});
		var wrh = new Warholizer({
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
			},
			cloneClickedHandler: (target) => {
				SocialSharing.share('Cekuj tenhle dis!', 'Foto', target.toDataURL('image/jpeg'));
			}
		});
		wrh.generateClones();
		this.generated = true;
	}
	
	/**
	 * @description Generates image element as a result of camera operation
	 * @param {String} String containing base64 reperesentation of the taken picture 
	 */
	useNewImageAsSrc(imageData){
		if(~imageData.indexOf(BASE64_PREFIX))
			this.imgSrc = imageData;
		else
			this.imgSrc = BASE64_PREFIX + imageData;
	}

}
