// Chỉnh sửa tên tệp và thư mục trong thư mục template về ban đầu

const { moveSync, pathExistsSync, removeSync } = require('fs-extra');

console.log('🔁 Resetting template files...');

const renameBackList = [
  { from: 'template/.eslintrc.js', to: 'template/_eslintrc.js' },
  { from: 'template/.gitignore', to: 'template/_gitignore' },
  { from: 'template/.prettierrc.js', to: 'template/_prettierrc.js' },
  { from: 'template/.watchmanconfig', to: 'template/_watchmanconfig' },
  { from: 'template/.bundle', to: 'template/_bundle' },
  { from: 'template/ios/.xcode.env', to: 'template/ios/_xcode.env' },
];

renameBackList.forEach(({ from, to }) => {
  if (pathExistsSync(from)) {
    try {
      moveSync(from, to, { overwrite: true });
      console.log(`✅ Renamed: ${from} → ${to}`);
    } catch (err) {
      console.error(`❌ Failed to rename: ${from} → ${to}`, err);
    }
  } else {
    console.warn(`⚠️  Skipped (not found): ${from}`);
  }
});

console.log('\n🧹 Cleaning up directories/files...');

const pathsToRemove = [
  'template/node_modules',
  'template/.vscode',
  'template/yarn.lock',
  'template/android/build',
  'template/android/app/build',
  'template/ios/build',
];

pathsToRemove.forEach((path) => {
  if (pathExistsSync(path)) {
    try {
      removeSync(path);
      console.log(`🗑️  Removed: ${path}`);
    } catch (err) {
      console.error(`❌ Failed to remove: ${path}`, err);
    }
  } else {
    console.warn(`⚠️  Skipped (not found): ${path}`);
  }
});

console.log('\n✅ Template reset complete.');
