import {Page, NavController} from 'ionic-angular';
import {Camera} from 'ionic-native';
import {CropperPage} from '../cropper/cropper';

const BASE_DIMENSION = 500;

@Page({
	templateUrl: 'build/pages/choose-action/choose-action.html',
})
export class ChooseActionPage {
	static get parameters() {
		return [[NavController]];
	}
	constructor(nav) {
		this.nav = nav;
	}
	/**
	 * @description Starts the device's camera
	 * @param {String} String specifying image source (device storage / camera) 
	 */
	getPicture(source) {
		var options = {
			destinationType: 0, //base64
			quality: 60,
			targetWidth: BASE_DIMENSION
		};
		if(source === 'device'){
			options.sourceType = 0; //photo library	
		}
		Camera.getPicture(options).then((imageData) => {
			this.nav.push(CropperPage, {imageData: imageData});
		}, (err) => {
			console.log('camera error');
			var demo = document.createElement("canvas");
			demo.width = BASE_DIMENSION;
			demo.height = BASE_DIMENSION;
			var img = new Image;
			img.src = "../../img/demo.jpg";
			img.onload = () => {
				demo.getContext("2d").drawImage(img, 0, 0, BASE_DIMENSION, BASE_DIMENSION);
				this.nav.push(CropperPage, {imageData: demo.toDataURL("image/jpeg")});
			}
		});
	}
}