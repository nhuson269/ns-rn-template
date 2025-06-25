// Chỉnh sửa tên tệp và thư mục trong thư mục template để code

const { moveSync, pathExistsSync } = require('fs-extra');

console.log('🔁 Renaming hidden files...');

const entriesToRename = [
  { from: 'template/_eslintrc.js', to: 'template/.eslintrc.js' },
  { from: 'template/_gitignore', to: 'template/.gitignore' },
  { from: 'template/_prettierrc.js', to: 'template/.prettierrc.js' },
  { from: 'template/_watchmanconfig', to: 'template/.watchmanconfig' },
  { from: 'template/_bundle', to: 'template/.bundle' },
  { from: 'template/ios/_xcode.env', to: 'template/ios/.xcode.env' },
];

entriesToRename.forEach(({ from, to }) => {
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

console.log('\n✅ Hidden file renaming complete.');

