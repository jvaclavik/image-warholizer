import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

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

  }

  getGallery(){
    return ["img/demo.jpg"]; //, "img/c2i_2512016172540.png", "img/codecamp.jpg"
  }

}

