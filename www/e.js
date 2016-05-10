function sayHello() {
    alert("Hello")
}

var app = require('app');
const remote = require('electron').remote;
const Menu = remote.Menu;

menuTemplate = [
    {
        label: "Important menu",
        submenu: [
            {
                label: "Say hello",
                click: sayHello
            }
        ]
    }
];
if (process.platform === 'darwin') {
    menuTemplate.unshift({
            label: "Basic",
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