import {Page, NavController} from 'ionic-angular';
import {Camera} from 'ionic-native';

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
	 */
	startCamera() {
		console.log(Camera);
		var options = {
			destinationType: 0
		};
		Camera.getPicture(options).then((imageData) => {
			//TODO crop?
			this.useNewImageAsSrc(imageData);
		}, (err) => {
			//TODO
			console.log('camera error');
		});
	}
	
	/**
	 * @description Generates image element as a result of camera operation
	 * @param {String} String containing base64 reperesentation of the taken picture 
	 */
	useNewImageAsSrc(imageData){
		this.imgSrc = "data:image/jpeg;base64," + imageData;
	}
	
	/**
	 * @description Returns element of existing image takne by camera or null if none present
	 */
	getImgElem(){
		var elem = document.getElementById(IMG_ELEM_ID);
		return elem;
	}
}