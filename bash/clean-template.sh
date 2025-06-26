#!/bin/bash

# Xoá những thư mục và file không cần
rm -rf template/node_modules
rm -rf template/.vscode
rm -rf template/.yarn
rm -rf template/yarn.lock
rm -rf template/android/build
rm -rf template/android/app/build
rm -rf template/ios/build
rm -rf template/ios/Pods
rm -rf template/ios/Podfile.lock
rm -rf template/ios/.xcode.env.local

# Đổi tên thư mục và file về ban đầu
mv template/.eslintrc.js template/_eslintrc.js
mv template/.gitignore template/_gitignore
mv template/.prettierrc.js template/_prettierrc.js
mv template/.watchmanconfig template/_watchmanconfig
mv template/.bundle template/_bundle
mv template/ios/.xcode.env template/ios/_xcode.env