#!/usr/bin/env python3
"""
完全重建项目依赖的脚本
删除所有损坏的锁定文件，然后运行干净的 npm install
"""
import subprocess
import shutil
import os
from pathlib import Path

def run_command(cmd, cwd=None):
    """运行命令并返回结果"""
    print(f"[v0] 运行命令: {' '.join(cmd)}")
    try:
        result = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True)
        if result.stdout:
            print(f"[v0] 输出: {result.stdout[:500]}")
        if result.returncode != 0:
            print(f"[v0] 错误: {result.stderr[:500]}")
        return result.returncode == 0
    except Exception as e:
        print(f"[v0] 执行异常: {e}")
        return False

# 项目根目录 - 就是当前工作目录
project_root = Path.cwd()
print(f"[v0] 当前工作目录（项目根): {project_root}")

# 检查 package.json 是否存在来验证我们在正确的目录
pkg_json = project_root / "package.json"
if pkg_json.exists():
    print("[v0] 找到 package.json，在正确的目录")
else:
    print(f"[v0] 警告: 找不到 package.json at {pkg_json}")

# 步骤 1: 删除 node_modules
node_modules_dir = project_root / "node_modules"
if node_modules_dir.exists():
    print("[v0] 删除 node_modules...")
    try:
        shutil.rmtree(node_modules_dir)
        print("[v0] node_modules 已删除")
    except Exception as e:
        print(f"[v0] 删除 node_modules 失败: {e}")

# 步骤 2: 删除所有锁定文件
lockfiles = [
    "package-lock.json",
    "npm-shrinkwrap.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    ".npm"
]

for lockfile in lockfiles:
    lockfile_path = project_root / lockfile
    if lockfile_path.exists():
        try:
            if lockfile_path.is_dir():
                shutil.rmtree(lockfile_path)
            else:
                lockfile_path.unlink()
            print(f"[v0] 已删除: {lockfile}")
        except Exception as e:
            print(f"[v0] 删除 {lockfile} 失败: {e}")

# 步骤 3: 清除 npm 缓存
print("[v0] 清除 npm 缓存...")
run_command(["npm", "cache", "clean", "--force"], cwd=str(project_root))

# 步骤 4: 运行 npm install with legacy peer deps
print("[v0] 运行 npm install...")
success = run_command(
    ["npm", "install", "--legacy-peer-deps"],
    cwd=str(project_root)
)

if success:
    print("[v0] npm install 成功完成！")
else:
    print("[v0] npm install 失败，尝试使用 --force...")
    success = run_command(
        ["npm", "install", "--legacy-peer-deps", "--force"],
        cwd=str(project_root)
    )
    if success:
        print("[v0] 使用 --force 重试后成功！")
    else:
        print("[v0] npm install 仍然失败")

print("[v0] 脚本执行完毕")
