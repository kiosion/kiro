const path = require('path');

const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');

const log = (...arg) => {
    console.log('[MAIN] ', ...arg, '\n');
    ipcMain.emit('log-to-renderer', log);
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

    if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' });
    }
}

const createLoginPopout = (url) => {
    log('createLoginPopout', url);
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        parent: BrowserWindow.getFocusedWindow(),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            webSecurity: false,
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
    log('Widevine installation encountered an error: ' + error);
    process.exit(1);
  });

ipcMain.handle('login-flow-initiate', async (_event, arg) => {
    log('login-flow-initiate', arg);
    
    let popout = createLoginPopout(arg);
    popout.addListener('page-title-updated', (_event, title) => {
        log('page-title-updated', title);
        if (title === 'success') {
            let code = popout.webContents.getURL().split('code=')[1];
            ipcMain.emit('login-flow-success', code);
            log('login-flow-success', code);
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
