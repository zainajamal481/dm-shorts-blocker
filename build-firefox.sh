#!/bin/bash

# DM Shorts Blocker - Firefox Build Script

echo "🦊 Сборка DM Shorts Blocker для Firefox..."

# Создаем папку для сборки Firefox
BUILD_DIR="build-firefox"
mkdir -p $BUILD_DIR

echo "📁 Копирование файлов..."

# Копируем основные файлы
cp content.js $BUILD_DIR/
cp popup.html $BUILD_DIR/
cp popup.css $BUILD_DIR/
cp popup.js $BUILD_DIR/
cp styles.css $BUILD_DIR/
cp -r icons $BUILD_DIR/

# Копируем специальные файлы для Firefox
cp manifest-firefox.json $BUILD_DIR/manifest.json
cp background-firefox.js $BUILD_DIR/background.js

# Создаем ZIP архив
echo "📦 Создание архива..."
cd $BUILD_DIR
zip -r ../dm-shorts-blocker-firefox-fixed.zip . > /dev/null
cd ..

echo "✅ Сборка Firefox завершена!"
echo "📁 Firefox версия: dm-shorts-blocker-firefox-fixed.zip"
echo ""
echo "🎯 Для установки в Firefox:"
echo "1. Откройте about:debugging"
echo "2. Нажмите 'Этот Firefox'"
echo "3. Нажмите 'Загрузить временное дополнение'"
echo "4. Выберите manifest.json из распакованной папки"
echo ""
echo "💡 Если все еще 'повреждено':"
echo "- Попробуйте упрощенную версию manifest-firefox-simple.json"
echo "- Убедитесь, что все файлы скопированы"
echo "- Проверьте консоль Firefox на ошибки"
