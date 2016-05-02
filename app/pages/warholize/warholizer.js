import 'caman';

const IMG_HEIGHT = 500;
const IMG_WIDTH = 500;
const HORIZONTAL_STRIPES = 'horizontal';
const VERTICAL_STRIPES = 'vertical';

export class Warholizer {
    constructor(options) {
		this.options = options;
        this.img = document.getElementById(options.sourceImgId);
        this.previews = document.getElementById(options.previewsElemId);
        this.canvasArray = [];
		
		this.cloneClickedHandler = options.cloneClickedHandler;
        this.resultWrapperNameBase = options.resultWrapperNameBase;
        this.idBase = options.resultElementNameBase;
		this.orientation = options.orientation;
		this.onRenderStart = options.onRenderStart;
		this.onRenderFinished = options.onRenderFinished;
		this.renderedImages = 0;

        this.filters = [
			{
                "brightness": 18,
                "contrast": 15,
                "gamma": 6.9,
                "channels": {"red": 30, "green": -100}
            }, 
			{
                "brightness": 18,
                "contrast": 15,
                "gamma": 6.9,
                "channels": {"red": 30, "green": 70, "blue": -80}
            }, 
            {
                "brightness": 18,
                "contrast": 15,
                "gamma": 6.9,
                "channels": {"red": -30, "blue": 100}
            },
            {
                "brightness": 18,
                "contrast": 20,
                "gamma": 6.9,
                "channels": {"red": 80, "green": 30, "blue": -60}
            },
        ]
		this.bindClick();
    };

    cloneFilter(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }

    generateClones() {
        var filterCopy = this.cloneFilter(this.filters);
		var resultCanvas = document.createElement('canvas');
		resultCanvas.width = IMG_WIDTH;
		resultCanvas.height = IMG_HEIGHT;
		var resultCanvasContext = resultCanvas.getContext('2d');
		var offsetH = 0;
		var offsetV = 0;
		var stripeWidth = Math.round(IMG_WIDTH / filterCopy.length);
		var stripeHeight = Math.round(IMG_HEIGHT / filterCopy.length);
		this.onRenderStart();
        for (let index in filterCopy) {

            var filter = filterCopy[index];
            var clone = this.img.cloneNode(true);
            clone.id = this.idBase + index;
            clone.dataset.camanHidpiDisabled = "true";

            var div = document.createElement("div");
            div.id = this.resultWrapperNameBase + index;

			if(this.orientation == HORIZONTAL_STRIPES){
				this.applyFilter(clone, filter, (caman) => {
					resultCanvasContext.drawImage(caman.canvas,0,offsetV,IMG_WIDTH,stripeHeight,0,offsetV,IMG_WIDTH,stripeHeight); 
					offsetV += stripeWidth;
				});	
			} else {
				this.applyFilter(clone, filter, (caman) => {
					resultCanvasContext.drawImage(caman.canvas,offsetH,0,stripeWidth,IMG_HEIGHT,offsetH,0,stripeWidth,IMG_HEIGHT); 
					offsetH += stripeWidth;
				});	
			}
			div.appendChild(clone);
			this.canvasArray.push(clone);
        }
		this.previews.appendChild(resultCanvas);
    }

    deleteClones(previews) {
        document.getElementById("focused-image").innerHTML = "";
        while (previews.firstChild) {
            previews.removeChild(previews.firstChild);
        }
    }

    applyFilter(image, filter, callback) {
		let instance = this;
        Caman(image, function() {
            for (var key in filter) {
                var value = filter[key];
				this[key](value);
            }
			
            this.imageHeight(IMG_HEIGHT)
            this.render(() => {
				if(callback) callback(this);
				instance.renderedImages++;
				if(instance.renderedImages >= instance.filters.length){
					instance.onRenderFinished();
				}
			});
			
        });
    }

    removeSelectClasses() {
        var previews = document.querySelectorAll("#previews > div");
        for (var i = 0; i < previews.length; i++) {
            previews[i].className = "";
        }
    }

    clickFunction(target, callback) {
        if (target.tagName != "CANVAS" || target.parentNode.id != this.options.previewsElemId) {
            return;
        }
        this.cloneClickedHandler(target);
    }

    bindClick(callback) {
        document.addEventListener('click', (event) => {
            var target = event.target;
			this.clickFunction(target, callback);
        });
    }

    exportImageData() {
        return document.querySelector("#focused-image > canvas").toDataURL();
    }
}
