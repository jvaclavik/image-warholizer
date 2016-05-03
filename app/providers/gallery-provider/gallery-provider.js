import {Injectable} from 'angular2/core';

const STORAGE_KEY = 'gallery';

@Injectable()
export class GalleryProvider {
    constructor() {
        this.gallery = [];
        var galleryImages = localStorage.getItem(STORAGE_KEY);
        if (galleryImages) {
            try {
                this.gallery = JSON.parse(galleryImages) || [];
            } catch (e) {
                console.warn('Error getting gallery filenames');
            }
        }
    }
    getGallery() {
        return this.gallery;
    }
    savePhoto(photo) {
        if (!window.canvas2ImagePlugin) {
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
}

