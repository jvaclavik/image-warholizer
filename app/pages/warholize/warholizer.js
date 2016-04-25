import 'caman';

export class Warholizer {
    constructor(sourceImg, previews) {
        this.img = sourceImg;
        this.previews = previews;
        this.canvasArray = [];
        this.selected = null;
        this.grid = false;
        this.gridImages = [];

        this.divIdBase = "result-div-";
        this.idBase = "result-image-";

        this.filters = [
            {
                "brightness": 18,
                "contrast": 15,
                //"saturation": -34,
                "gamma": 6.9,
                //"clip": 38,
                "channels": {"red": -40, "green": -80, "blue": 70}
            }, {
                "brightness": 18,
                "contrast": 15,
                //"saturation": -34,
                "gamma": 6.9,
                //"clip": 38,
                "channels": {"red": 30, "green": -100}
            }, {
                "brightness": 18,
                "contrast": 15,
                //"saturation": -34,
                "gamma": 6.9,
                //"clip": 38,
                "channels": {"red": 30, "green": 70, "blue": -80}
            }, {
                "brightness": 18,
                "contrast": 15,
                //"saturation": -34,
                "gamma": 6.9,
                //"clip": 38,
                "channels": {"red": -40, "blue": 60, "green": 60}
            },
            {
                "brightness": 18,
                "contrast": 15,
                //"saturation": -34,
                "gamma": 6.9,
                //"clip": 38,
                "channels": {"red": -30, "blue": 100}
            },
            //{
            //    "brightness": 18,
            //    "contrast": 15,
            //    "saturation": -34,
            //    "gamma": 6.9,
            //    "clip": 38,
            //    "channels": {"green": 50, "blue": -50}
            //},

            {
                "brightness": 18,
                "contrast": 20,
                //"saturation": -34,
                "gamma": 6.9,
                //"clip": 38,
                "channels": {"red": 80, "green": 30, "blue": -60}
            },
            {
                "brightness": 18,
                "contrast": 15,
                //"saturation": -34,
                "gamma": 6.9,
                //"clip": 38,
                "channels": {"blue": 100, "green": -50}
            }

            //,{
            //    "brightness": 18,
            //    "contrast": 15,
            //    "saturation": -34,
            //    "gamma": 6.9,
            //    "clip": 38,
            //    "channels": {"blue": 50, "green": -50, "red":-50}
            //}
        ]
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
            div.id = this.divIdBase + index;

            //console.log("apply filter");
            this.applyFilter(clone, filter);
            //console.log("apply filter end");
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
            //this.colorize("#ff0000", 70);
            //this.channels({ "red": 100 });
            this.imageHeight(200)
            //console.log("before render");
            this.render();
            //console.log("after");
            //console.log("render");
        });


    }

    initClick(callback) {
        //console.log("initClick");
        var wrh = this;

        if (wrh.grid == true) {
            for (var i = 0; i < 4; i++) {
                wrh.gridFunction(document.getElementById("result-image-" + i), callback);
            }


        } else {
            var target = document.getElementById("result-image-0");
            wrh.clickFunction(target, callback);
        }


    }


    initFirstClick(callback) {

        var wrh = this;

        Caman.Event.listen("renderFinished", function (job) {
            //console.log("render finished")
            setTimeout(function () {
                wrh.initClick(callback);
            }, 800);
        });
    }

    removeSelectClasses() {
        var previews = document.querySelectorAll("#previews > div");
        for (var i = 0; i < previews.length; i++) {
            //console.info(previews[i].className);
            previews[i].className = "";
        }
    }

    addOrRemoveFromGrid(target) {
        var id = target.getAttribute('id');
        var wrh = this;
        var positionInGrid = -1;
        var status = -1;

        if (id != null) {
            var index = wrh.gridImages.indexOf(id);
            if (index == -1) {
                if (wrh.gridImages.length < 4) {
                    wrh.gridImages.push(id);
                }
            } else {
                wrh.gridImages.splice(index, 1)
            }

            var divElements = document.querySelectorAll("#previews > div");
            for (var i = 0; i < divElements.length; i++) {
                var isInGrid = false;
                for (var j = 0; j < wrh.gridImages.length; j++) {
                    //console.info(divElements[i].id.replace("div", "image"), wrh.gridImages[j]);
                    if (divElements[i].id.replace("div", "image") == wrh.gridImages[j]) {
                        isInGrid = true;
                        var imageGridElement = wrh.gridImages[j].replace("image", "div");
                        document.querySelector("#" + imageGridElement).className = "selected";
                    }
                }
                if (!isInGrid)
                    divElements[i].className = "";
            }
            //console.info(wrh.gridImages);

            //
            //console.info(wrh.gridImages);
            //for (var i = 0; i < wrh.gridImages.length; i++) {
            //    if (wrh.gridImages[i] == id){
            //        console.info(wrh.gridImages[i]+" == "+id);
            //        positionInGrid = i;
            //    } else{
            //        console.info(wrh.gridImages[i]+" != "+id);
            //    }
            //}
            //if (positionInGrid == -1 && target.parentNode.className != "selected") {
            //    if (wrh.gridImages.length < 4) {
            //        wrh.gridImages.push(id);
            //        target.parentNode.className = "selected";
            //    }
            //} else {
            //    wrh.gridImages.splice(positionInGrid, 1)
            //    target.parentNode.className = "";
            //}
        }

        return status
    }

    gridFunction(target, callback) {
        var wrh = this;
        if (target.tagName != "CANVAS" || target.parentNode.parentNode.id != "previews") {
            return;
        }

        wrh.addOrRemoveFromGrid(target);
        if (wrh.gridImages.length <= 4) {
            var canvas = document.querySelector("#focused-image > canvas");
            canvas.dataset.camanHidpiDisabled = "true";
            //canvas.style.display = "none"
            //canvas.setAttribute("data-caman-hidpi-disabled","true");
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            var size = canvas.width / 2;
            var x, y;
            for (var i = 0; i < wrh.gridImages.length; i++) {
                if (i == 0) {
                    x = 0;
                    y = 0;
                } else if (i == 1) {
                    x = size;
                    y = 0;
                } else if (i == 2) {
                    x = 0;
                    y = size;
                } else {
                    x = size;
                    y = size;
                }

                var res = document.getElementById(wrh.gridImages[i]);
                context.drawImage(res, x, y, size, size);
            }
            if (callback)
                callback();
        }
    }

    clickFunction(target, callback) {
        var wrh = this;

        if (target.tagName != "CANVAS" || target.parentNode.parentNode.id != "previews") {
            return;
        }
        var focusedPreview = document.getElementById("focused-image");

        var imgs = target.parentNode.parentNode.children;
        for (var key in imgs) {
            var image = imgs[key];
            if (image.tagName == undefined) continue;
            //key.querySelector("canvas")
            image.className = "";
        }


        target.parentNode.className = "selected";


        focusedPreview.innerHTML = "";
        var clone = target.cloneNode(true);

        focusedPreview.appendChild(clone);

        //console.info(window.getComputedStyle(
        //    target.parentNode, ':before'
        //).getPropertyValue('background-color'));

        clone.id = null;
        clone.width = window.innerWidth;
        clone.height = window.innerWidth;
        clone.dataset.camanHidpiDisabled = "true";
        var cloneContext = clone.getContext('2d');
        cloneContext.drawImage(target, 0, 0, window.innerWidth, window.innerWidth);

        wrh.selected = target;
        if (callback)
            callback();
    }

    bindClick(callback) {
        var wrh = this;
        document.addEventListener('click', function (event) {
            var target = event.target;
            if (wrh.grid == true) {
                wrh.gridFunction(target, callback);
            } else {
                wrh.clickFunction(target, callback);
            }


        });
    }

    exportImageData() {
        return document.querySelector("#focused-image > canvas").toDataURL();
    }

    getSelectedImage() {
        return this.selected;
    }
}
