export class Utility {
    constructor() {
		
    };
	
	static isElectron(){
		return (window && window.process && window.process.type) || !window.cordova;
	};
}
