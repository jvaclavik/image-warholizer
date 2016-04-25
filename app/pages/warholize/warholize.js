import {Page} from 'ionic-angular';
import {Warholizer} from './warholizer';


@Page({
    templateUrl: 'build/pages/warholize/warholize.html'
})
export class WarholizePage {
    constructor(){
		this.generated = false;
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
				//TODO implement clone clicked handler (share? save?)
				console.log('clicked', target);
			}
		});
		wrh.generateClones();
		this.generated = true;
	}

}
