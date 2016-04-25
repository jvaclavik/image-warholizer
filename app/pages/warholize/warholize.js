import {Page} from 'ionic-angular';
import {Warholizer} from './warholizer';


@Page({
    templateUrl: 'build/pages/warholize/warholize.html'
})
export class WarholizePage {
    constructor(){

        setTimeout(function(){
            var previews = document.getElementById('previews');
            var image = document.getElementById('source-image');
            console.info(previews, image);
            var wrh = new Warholizer(image, previews);
            wrh.generateClones();
        },2500);

    }

}
