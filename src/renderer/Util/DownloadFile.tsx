const {BrowserWindow, ipcMain} = require('electron');


ipcMain.on('download-url', (event, url) => {
  saveFile(url);
});

export const saveFile= async (url:string) => {
  const response = await fetch(url);
  const file = await response.blob();
  console.log(file);
}
