import 'caman';

const IMG_HEIGHT = 500;
const IMG_WIDTH = 500;

export class Warholizer {
    constructor(options) {
		this.options = options;
        this.img = document.getElementById(options.sourceImgId);
        this.previews = document.getElementById(options.previewsElemId);
        this.canvasArray = [];
		
		this.cloneClickedHandler = options.cloneClickedHandler;
        this.resultWrapperNameBase = options.resultWrapperNameBase;
        this.idBase = options.resultElementNameBase;

        this.filters = [
			{
                "brightness": 18,
                "contrast": 15,
                "gamma": 6.9,
                "channels": {"red": 30, "green": -100}
            }, {
                "brightness": 18,
                "contrast": 15,
                "gamma": 6.9,
                "channels": {"red": 30, "green": 70, "blue": -80}
            }, {
                "brightness": 18,
                "contrast": 15,
                "gamma": 6.9,
                "channels": {"red": -40, "blue": 60, "green": 60}
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
            {
                "brightness": 18,
                "contrast": 15,
                "gamma": 6.9,
                "channels": {"blue": 100, "green": -50}
            }
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
		var offset = 0;
		var stripeWidth = Math.round(IMG_WIDTH / filterCopy.length);
		console.log('calculated stripe width', stripeWidth, ', image width', getComputedStyle(this.img).width);
        for (let index in filterCopy) {

            var filter = filterCopy[index];
            var clone = this.img.cloneNode(true);
            clone.id = this.idBase + index;
            clone.dataset.camanHidpiDisabled = "true";

            var div = document.createElement("div");
            div.id = this.resultWrapperNameBase + index;

            this.applyFilter(clone, filter, (caman) => {
				resultCanvasContext.drawImage(caman.canvas,offset,0,stripeWidth,IMG_HEIGHT,offset,0,stripeWidth,IMG_HEIGHT); 
				offset += stripeWidth;
			});
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
        Caman(image, function () {
            for (var key in filter) {
                var value = filter[key];
				this[key](value);
            }
			
            this.imageHeight(IMG_HEIGHT)
            this.render(function(){
				if(callback) callback(this);
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
        var wrh = this;

        if (target.tagName != "CANVAS" || target.parentNode.parentNode.id != this.options.previewsElemId) {
            return;
        }
        this.cloneClickedHandler(target);
    }

    bindClick(callback) {
        var wrh = this;
        document.addEventListener('click', function (event) {
            var target = event.target;
			wrh.clickFunction(target, callback);
        });
    }

    exportImageData() {
        return document.querySelector("#focused-image > canvas").toDataURL();
    }
}
