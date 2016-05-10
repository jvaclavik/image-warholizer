import {Page, NavController} from 'ionic-angular';
import {Camera} from 'ionic-native';
import {CropperPage} from '../cropper/cropper';
import {Utility} from '../../utility';

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

		setTimeout(function(){

		},500);
	}
	
	isElectron(){
		return Utility.isElectron();
	}
	
	snapPhoto(event){
		var canvas = document.getElementById("canvas");
		var context = canvas.getContext("2d");
		context.drawImage(video, 0, 0, 640, 480);
		this.nav.push(CropperPage, {imageData: canvas.toDataURL("image/jpeg")});
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
			if(source !== 'device'){
				var video = document.getElementById("video");
				var videoObj = { "video": true };
				
				var videoErrorHandler = function(error) {
					console.error("Failed to capture video: ", error.code);
				};

				if(navigator.getUserMedia) { // Standard
					navigator.getUserMedia(videoObj, function(stream) {
						video.src = stream;
						video.play();
					}, videoErrorHandler);
				} else 
				if(navigator.webkitGetUserMedia) { // WebKit-prefixed
					navigator.webkitGetUserMedia(videoObj, function(stream){
						video.src = window.webkitURL.createObjectURL(stream);
						video.play();
					}, videoErrorHandler);
				}
			} else{
				console.error('camera error');
				var demo = document.createElement("canvas");
				demo.width = BASE_DIMENSION;
				demo.height = BASE_DIMENSION;
				var img = new Image;
				//img.src = "../../build/img/demo.jpg";
				img.src = "../../img/demo.jpg";
				img.onload = () => {
				demo.getContext("2d").drawImage(img, 0, 0, BASE_DIMENSION, BASE_DIMENSION);
				this.nav.push(CropperPage, {imageData: demo.toDataURL("image/jpeg")});
				}
			}
		});
	}
}