#!/usr/bin/env python3
"""
最后的依赖重建脚本
"""
import subprocess
import shutil
import os

print("[v0] 开始最后的依赖重建")
print(f"[v0] 当前工作目录: {os.getcwd()}")

# 检查我们是否在正确的目录
if os.path.exists("package.json"):
    print("[v0] 找到 package.json，开始清理...")
    
    # 删除 node_modules
    if os.path.exists("node_modules"):
        print("[v0] 删除 node_modules...")
        try:
            shutil.rmtree("node_modules")
            print("[v0] node_modules 已删除")
        except Exception as e:
            print(f"[v0] 删除失败: {e}")
    
    # 删除 package-lock.json
    if os.path.exists("package-lock.json"):
        print("[v0] 删除 package-lock.json...")
        try:
            os.remove("package-lock.json")
            print("[v0] package-lock.json 已删除")
        except Exception as e:
            print(f"[v0] 删除失败: {e}")
    
    # 运行 npm install
    print("[v0] 运行 npm install...")
    result = subprocess.run(["npm", "install"], capture_output=False, text=True)
    
    if result.returncode == 0:
        print("[v0] ✓ npm install 成功!")
    else:
        print(f"[v0] ✗ npm install 失败，返回码: {result.returncode}")
else:
    print("[v0] 找不到 package.json，无法继续")
    print("[v0] 列出当前目录文件:")
    try:
        files = os.listdir(".")
        for f in files[:20]:  # 只列出前20个
            print(f"  {f}")
    except Exception as e:
        print(f"[v0] 列出失败: {e}")
