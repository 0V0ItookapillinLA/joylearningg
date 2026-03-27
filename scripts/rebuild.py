#!/usr/bin/env python3
import subprocess
import shutil
import os
from pathlib import Path

# 项目根目录（使用绝对路径）
# 获取脚本目录，然后往上一级是项目根
script_dir = Path("/vercel/share/v0-project/scripts")
root_dir = script_dir.parent

print(f"[v0] 脚本目录: {script_dir}")
print(f"[v0] 项目根目录: {root_dir}")
print(f"[v0] 开始清理 node_modules...")

# 清理 node_modules
node_modules = root_dir / "node_modules"
if node_modules.exists():
    print("[v0] 删除 node_modules...")
    shutil.rmtree(node_modules, ignore_errors=True)
    print("[v0] 已删除 node_modules")

# 运行 npm install
print(f"[v0] 在目录 {root_dir} 中运行 npm install...")
try:
    # 首先检查 package.json 是否存在
    pkg_json = root_dir / "package.json"
    if not pkg_json.exists():
        print(f"[v0] 错误: 找不到 package.json: {pkg_json}")
    else:
        print(f"[v0] 找到 package.json")
        result = subprocess.run(
            ["npm", "install"],
            cwd=str(root_dir),
            capture_output=False,
            text=True
        )
        if result.returncode == 0:
            print("[v0] 依赖安装成功！")
        else:
            print("[v0] npm install 返回非零代码")
except Exception as e:
    print(f"[v0] 出错: {e}")
