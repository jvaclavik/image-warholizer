import {Page, NavController, NavParams} from 'ionic-angular';


@Page({
    templateUrl: 'build/pages/settings/settings.html'
})
export class SettingsPage {
    static get parameters() {
        return [[NavController], [NavParams]];
    }

    constructor(nav, navParams) {
        this.nav = nav;
        this.array = ["a", "b"];

    }


}
