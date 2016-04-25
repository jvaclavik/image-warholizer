import 'caman';

export class Warholizer {
    constructor(options) {
		this.options = options;
        this.img = document.getElementById(options.sourceImgId);
        this.previews = document.getElementById(options.previewsElemId);
        this.canvasArray = [];
        this.selected = null;
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
        for (var index in filterCopy) {

            var filter = filterCopy[index];
            var clone = this.img.cloneNode(true);
            clone.id = this.idBase + index;
            clone.dataset.camanHidpiDisabled = "true";

            var div = document.createElement("div");
            div.id = this.resultWrapperNameBase + index;

            this.applyFilter(clone, filter);
            div.appendChild(clone);
            this.previews.appendChild(div);
            this.canvasArray.push(clone);
        }
    }

    deleteClones(previews) {
        document.getElementById("focused-image").innerHTML = "";
        while (previews.firstChild) {
            previews.removeChild(previews.firstChild);
        }

    }

    applyFilter(image, filter) {
		console.log(Caman);
        Caman(image, function () {
            for (var key in filter) {
                var value = filter[key];
                if (key == "channels") {
                    this[key](value);

                } else
                    this[key](value);
            }

            this.imageHeight(200)
            this.render();
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

    getSelectedImage() {
        return this.selected;
    }
}
