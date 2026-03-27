#!/bin/bash
set -e

echo "清理旧的依赖..."
rm -rf node_modules package-lock.json

echo "重新安装依赖..."
npm install

echo "依赖安装完成！"
