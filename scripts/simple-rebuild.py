#!/usr/bin/env python3
import subprocess
import shutil
from pathlib import Path

# 直接指定项目目录
project_dir = "/home/vercel-sandbox/vercel/share/v0-project"

# 尝试多个可能的路径
possible_paths = [
    "/home/vercel-sandbox/vercel/share/v0-project",
    "/vercel/share/v0-project",
    "/home/user/v0-project",
]

# 找到真实存在的项目目录
real_project_dir = None
for path in possible_paths:
    p = Path(path)
    if (p / "package.json").exists():
        real_project_dir = str(p)
        print(f"[v0] 找到项目目录: {real_project_dir}")
        break

if not real_project_dir:
    # 尝试搜索找到 package.json
    import os
    for root, dirs, files in os.walk("/home"):
        if "package.json" in files and "node_modules" not in root:
            real_project_dir = root
            print(f"[v0] 通过搜索找到项目目录: {real_project_dir}")
            break

if real_project_dir:
    print(f"[v0] 删除 node_modules...")
    nm_path = Path(real_project_dir) / "node_modules"
    if nm_path.exists():
        shutil.rmtree(nm_path, ignore_errors=True)
    
    print(f"[v0] 删除 package-lock.json...")
    lock_path = Path(real_project_dir) / "package-lock.json"
    if lock_path.exists():
        lock_path.unlink()
    
    print(f"[v0] 运行 npm install...")
    result = subprocess.run(
        ["npm", "install", "--legacy-peer-deps"],
        cwd=real_project_dir,
        capture_output=False
    )
    
    if result.returncode == 0:
        print("[v0] npm install 成功!")
    else:
        print(f"[v0] npm install 返回码: {result.returncode}")
else:
    print("[v0] 无法找到项目目录")
