import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import axios from 'axios';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
// import Store from 'electron-store';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

// const store = new Store();

// //store 에 port 라는 변수로 80 세팅
// store.set('port', 80);

// //store 에 port 라는 변수를 가져오기
// console.log(store.get('port'));

// //store 에 port 라는 변수 삭제
// store.delete('port');

/* ipcMain */

ipcMain.on('getPHPSESSID', async (event, arg) => {
  let data = arg[0];
  axios
    .post('https://djshs.kr/bbs/login_check.php', data, {
      headers: {
        // 'Content-Type': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'access-control-allow-credentials': 'true',
      },
      withCredentials: true,
      maxRedirects: 0,
      validateStatus: (status) => {
        if (200 <= status && status <= 320) return true;
        return false;
      },
    })
    .then((res) => {
      event.reply('reply-getPHPSESSID', res.headers['set-cookie']);
      return '';
    })
    .catch((error) => {
      console.error(error);
      event.reply('reply-getPHPSESSID', ['ConnectFailed']);
    });
});

ipcMain.on('getContent', async (event, arg) => {
  let PHPSESSID = arg[0];

  // console.log();
  axios
    .get('https://djshs.kr/', {
      headers: {
        // 'Content-Type': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;',
        'access-control-allow-credentials': 'true',
        Cookie: PHPSESSID,
      },
      withCredentials: true,
      maxRedirects: 0,
      validateStatus: (status) => {
        return true;
      },
    })
    .then((res) => {
      event.reply('reply-getContent', res.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

ipcMain.on('doSelfStudyApply', async (event, arg) => {
  let PHPSESSID = arg[0];
  let data = arg[1];
  console.log(data);
  axios
    .post('https://djshs.kr/theme/s007/index/subpg1_3_upload.php', data, {
      headers: {
        // 'Content-Type': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'access-control-allow-credentials': 'true',
        Cookie: PHPSESSID,
      },
      withCredentials: true,
      maxRedirects: 0,
      validateStatus: (status) => {
        return true;
      },
    })
    .then((res) => {
      event.reply('reply-doSelfStudyApply', res.status);
    })
    .catch((error) => {
      console.error(error);
    });
});

ipcMain.on('getScoreList', async (event, arg) => {
  let PHPSESSID = arg[0];
  let memberId = arg[1];
  let grade = 1;
  if (memberId.startsWith('2022')) grade = 1;
  if (memberId.startsWith('2021')) grade = 2;
  if (memberId.startsWith('2020')) grade = 3;

  axios
    .get(
      'https://djshs.kr/theme/s007/index2/stu_subpg2_1.php?sgrade=' + grade,
      {
        headers: {
          // 'Content-Type': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded;',
          'access-control-allow-credentials': 'true',
          Cookie: PHPSESSID,
        },
        withCredentials: true,
        maxRedirects: 0,
        validateStatus: (status) => {
          return true;
        },
      }
    )
    .then((res) => {
      event.reply('reply-getScoreList', res.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

ipcMain.on('getWeekdayCurrentState', async (event, arg) => {
  let PHPSESSID = arg[0];

  axios
    .get('https://djshs.kr/theme/s007/index2/stu_subpg1_1.php', {
      headers: {
        // 'Content-Type': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;',
        'access-control-allow-credentials': 'true',
        Cookie: PHPSESSID,
      },
      withCredentials: true,
      maxRedirects: 0,
      validateStatus: (status) => {
        return true;
      },
    })
    .then((res) => {
      event.reply('reply-getWeekdayCurrentState', res.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

/* ipc Main End*/

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 640,
    height: 480,
    resizable: false,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
