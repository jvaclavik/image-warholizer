import {Page, NavController} from 'ionic-angular';
import {Camera} from 'ionic-native';
import {WarholizePage} from '../warholize/warholize';

const IMG_ELEM_ID = 'camera-result';

/*
  Generated class for the ChooseActionPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
	templateUrl: 'build/pages/choose-action/choose-action.html',
})
export class ChooseActionPage {
	static get parameters() {
		return [[NavController]];
	}

	constructor(nav) {
		this.nav = nav;
		this.imgSrc = 'todo placeholder image';
	}

	/**
	 * @description Starts the device's camera
	 * @param {String} String specifying image source (device storage / camera) 
	 */
	getPicture(source) {
		var options = {
			destinationType: 0, //base64
			quality: 50,
			targetWidth: 500
		};
		if(source === 'device'){
			options.sourceType = 0; //photo library	
		}
		Camera.getPicture(options).then((imageData) => {
			//TODO crop?
			this.nav.push(WarholizePage, {imageData: imageData});
		}, (err) => {
			//TODO
			console.log('camera error');
		});
	}
}