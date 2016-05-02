import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

const STORAGE_KEY = 'gallery';

/*
  Generated class for the GalleryProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GalleryProvider {
  static get parameters(){
    return [[Http]]
  }  

  constructor(http) {
    this.gallery = [];
    var galleryImages = localStorage.getItem(STORAGE_KEY);
    if(galleryImages){
      try {
        this.gallery = JSON.parse(galleryImages); 
      } catch(e) {
        console.error('Error getting gallery filenames.');
        // do nothing
      }
    }
  }
	
  savePhoto(photo) {
    if(!window.canvas2ImagePlugin){
      console.warn('No canvas2Image plugin available, photo not saved.');
      return;
    }
    
    window.canvas2ImagePlugin.saveImageDataToLibrary(
      (fileName) => {
         this.gallery.push(fileName);
         localStorage.setItem(STORAGE_KEY, JSON.stringify(this.gallery));
      },
      (err) => {
         console.error(err);
      },
      photo
    );
  }

  getGallery(){
    return this.gallery; //, "img/c2i_2512016172540.png", "img/codecamp.jpg"
  }

}

