import {Page, NavController, NavParams} from 'ionic-angular';
import {SocialSharing} from 'ionic-native';
import {Warholizer} from './warholizer';


@Page({
    templateUrl: 'build/pages/warholize/warholize.html'
})
export class WarholizePage {
	static get parameters(){
		return [[NavController], [NavParams]];	
	}
	
    constructor(nav, navParams){
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
	applyEffect(){
		if(this.generated) return;
		var wrh = new Warholizer({
			previewsElemId: 'previews',
			sourceImgId: 'source-image',
			resultWrapperNameBase: 'result-wrapper-',
			resultElementNameBase: 'result-',
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
		this.imgSrc = "data:image/jpeg;base64," + imageData;
	}

}
