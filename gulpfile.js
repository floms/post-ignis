const {series, task, src, dest} = require('gulp');
const {spawn} = require('child_process');
const createDMG = require('electron-installer-dmg');
const electronInstaller = require('electron-winstaller');

const isWindows = () => process.platform === 'win32';

const DIST_PATH = 'dist';
const APP_DIST_PATH = `${DIST_PATH}/postignis`;

const packager = require('electron-packager');

task('build-ui', (done) => {
  const runBuild = spawn(isWindows() ? 'npm.cmd' : 'npm', ['run', 'build', '--', '--prod']);

  runBuild.stdout.on('data', function (data) {
    console.log(data.toString());
  });

  runBuild.stderr.on('data', function (data) {
    console.error(data.toString());
  });

  runBuild.on('exit', function (code) {
    // console.log('child process exited with code ' + code.toString());
    done();
  });
});

task('copy-resources', () => {
  return src([
    'package.json',
    'index.js'
  ]).pipe(dest(APP_DIST_PATH))
});

task('package-app', async () => {
  return await packager({
    dir: APP_DIST_PATH,
    out: `${DIST_PATH}/app`,
    overwrite: true,
    name: 'PostIgnis',
    executableName: 'PostIgnis',
    icon: `${APP_DIST_PATH}/assets/icons/app`,
    appCategoryType: 'public.app-category.developer-tools',
    appBundleId: 'com.floms.postignis'
  });
});

task('create-installer', async () => {
  switch (process.platform) {
    case 'darwin':
      return new Promise((resolve, reject) => {
        createDMG({
          appPath: `${DIST_PATH}/app/PostIgnis-win32-x64/PostIgnis.app`,
          name: 'PostIgnis',
          overwrite: true,
          icon: `${APP_DIST_PATH}/assets/icons/app.icns`,
          out: `${DIST_PATH}/app/installer`
        }, (error) => {
          if (error) {
            return reject(error);
          }

          return resolve();
        });
      });
    case 'win32':
      return electronInstaller.createWindowsInstaller({
        appDirectory: `${DIST_PATH}/app/PostIgnis-win32-x64`,
        outputDirectory: `${DIST_PATH}/app/installer`,
        icon: `${APP_DIST_PATH}/assets/icons/app.ico`,
        exe: 'PostIgnis.exe'
      });
  }
});

task('build-app', series('build-ui', 'copy-resources'));
task('package', series('build-app', 'package-app'));
task('installer', series('package', 'create-installer'));
