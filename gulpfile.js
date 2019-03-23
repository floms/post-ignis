const {series, task, src, dest} = require('gulp');
const {spawn} = require('child_process');

const DIST_PATH = 'dist';
const APP_DIST_PATH = `${DIST_PATH}/postignis`;

const packager = require('electron-packager');

const copy = () => {
  return src([
    'package.json',
    'index.js'
  ]).pipe(dest(APP_DIST_PATH))
};

const build = (done) => {
  const runBuild = spawn('npm', ['run', 'build']);

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
};

const pack = async () => {
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
};

exports.build = build;
exports.copy = copy;
exports.pack = pack;

exports.default = series(build, copy, pack);
