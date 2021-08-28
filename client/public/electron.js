const path = require('path');

const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            sandbox: false
        }
    });

    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );

    if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' });
    }
}

const createLoginPopout = (url) => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            sandbox: false
        }
    });

    win.loadURL(url);

    if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' });
    }

    return win;
}

app.on('widevine-ready', createWindow);

app.on('widevine-error', (error) => {
    console.log('Widevine installation encountered an error: ' + error);
    process.exit(1);
  });

ipcMain.on('login-flow-initiate', (_event, arg) => {
    let popout = createLoginPopout(arg);
    popout.addListener('page-title-updated', (_event, title) => {
        if (title === 'Success') {
            popout.close();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
