#!/bin/bash

# YouTube Shorts Blocker - Build Script

echo "🚀 Сборка YouTube Shorts Blocker..."

# Создаем папку для сборки
BUILD_DIR="build"
CHROME_DIR="$BUILD_DIR/chrome"
FIREFOX_DIR="$BUILD_DIR/firefox"

# Очищаем предыдущую сборку
rm -rf $BUILD_DIR
mkdir -p $CHROME_DIR $FIREFOX_DIR

echo "📁 Копирование файлов..."

# Копируем общие файлы
cp content.js $CHROME_DIR/
cp content.js $FIREFOX_DIR/
cp background.js $CHROME_DIR/
cp background.js $FIREFOX_DIR/
cp popup.html $CHROME_DIR/
cp popup.css $CHROME_DIR/
cp popup.js $CHROME_DIR/
cp styles.css $CHROME_DIR/
cp styles.css $FIREFOX_DIR/
cp -r icons $CHROME_DIR/
cp -r icons $FIREFOX_DIR/

# Копируем соответствующие manifest файлы
cp manifest.json $CHROME_DIR/
cp manifest-firefox.json $FIREFOX_DIR/manifest.json

# Создаем ZIP архивы
echo "📦 Создание архивов..."

cd $CHROME_DIR
zip -r ../youtube-shorts-blocker-chrome.zip . > /dev/null

cd ../firefox
zip -r ../youtube-shorts-blocker-firefox.zip . > /dev/null

cd ../..

echo "✅ Сборка завершена!"
echo "📁 Chrome версия: $BUILD_DIR/youtube-shorts-blocker-chrome.zip"
echo "📁 Firefox версия: $BUILD_DIR/youtube-shorts-blocker-firefox.zip"
echo ""
echo "🎯 Для установки:"
echo "Chrome: chrome://extensions/ → Режим разработчика → Загрузить распакованное расширение"
echo "Firefox: about:debugging → Этот Firefox → Загрузить временное дополнение"
