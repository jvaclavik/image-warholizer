

function ahoj() {

}
var app = require('app');
const remote = require('electron').remote;
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;
menuTemplate = [
    {
        label: "aa",
        submenu: [
            {
                label: "tvoje mama",
                click: ahoj
            }
        ]
    }
];
if (process.platform === 'darwin') {
    menuTemplate.unshift({
            label: "aaa",
            submenu: [
                {
                    label: 'About ',
                    role: 'about'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click: () => {
                        app.quit();
                    }
                },
            ]
        }
    )
    ;
}
Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate))