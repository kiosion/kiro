const path = require('path');

const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');

const log = (...arg) => {
    console.log('[MAIN] ', ...arg, '\n');
};

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            webSecurity: false,
            sandbox: false
        }
    });

    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );
}

const createLoginPopout = (url) => {
    log('createLoginPopout', url);
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        parent: BrowserWindow.getFocusedWindow(),
        modal: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            webSecurity: false,
            sandbox: false
        }
    });

    win.loadURL(url);

    return win;
}

app.on('widevine-ready', createWindow);

app.on('widevine-error', (error) => {
    log('Widevine installation encountered an error: ' + error);
    process.exit(1);
  });

ipcMain.handle('login-flow-initiate', (event, arg) => {
    log('login-flow-initiate', arg);
    let popout = createLoginPopout(arg);
    popout.addListener('page-title-updated', (_event, title) => {
        log('page-title-updated', title);
        if (title === 'success' || (title === 'Kiro' && isDev)) {
            let code = popout.webContents.getURL().split('code=')[1];
            event.sender.send('login-flow-resolve', code);
            log('login-flow-resolve', code);
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
