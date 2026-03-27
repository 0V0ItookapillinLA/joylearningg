#!/bin/bash
cd /vercel/share/v0-project
echo "[v0] Working directory: $(pwd)"

if [ -f "package.json" ]; then
    echo "[v0] Found package.json"
    echo "[v0] Removing node_modules..."
    rm -rf node_modules
    echo "[v0] Removing package-lock.json..."
    rm -f package-lock.json
    echo "[v0] Running npm install..."
    npm install --legacy-peer-deps
    echo "[v0] Done!"
else
    echo "[v0] package.json not found"
fi
