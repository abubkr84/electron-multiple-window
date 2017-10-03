const electron = require('electron');

const  { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let newWindow;
app.on('ready', () => {
 mainWindow =  new BrowserWindow({});
 mainWindow.loadURL(`file://${__dirname}\\main.html`);
 mainWindow.on('close', () => {
          app.quit();
 })
 const mainMenu = Menu.buildFromTemplate(menuTemplate);
 Menu.setApplicationMenu(mainMenu);

});

function addNewWindow(){
 newWindow = new BrowserWindow({
     width: 300,
     height: 200,
     title: 'Add New Todo'
 })
 newWindow.loadURL(`file://${__dirname}\\add.html`);
 newWindow.on('closed', () =>  {
    newWindow = null;
})

}
ipcMain.on('addtodo', (event, todo) => {
    mainWindow.webContents.send('addtodo', todo);
    newWindow.close();    
})
const menuTemplate = [
    
    {
        label: 'File',
        submenu: [{
            label: 'New Todo',
            click() {
                addNewWindow();
            }

        },
        {
            label: 'Quit',
            accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
            click() {
              app.quit();  
            }
            
        }
    ]

    }
]

if (process.env.NODE_ENV !== 'production') {
   menuTemplate.push({
       label: 'View',
       submenu: [{
           label: 'Toggle Dev Tools',
           click(item, focusedWindow){
                focusedWindow.toggleDevTools();
           }
       }]
   })
}