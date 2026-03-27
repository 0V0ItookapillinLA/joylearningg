#!/usr/bin/env python3
import subprocess
import os

# 获取脚本所在目录
cwd = os.getcwd()
print(f"[v0] 工作目录: {cwd}")

# 检查 package.json 是否存在
if os.path.exists("package.json"):
    print("[v0] 找到 package.json")
    print("[v0] 运行 npm install...")
    result = subprocess.run(["npm", "install"], capture_output=False)
    if result.returncode == 0:
        print("[v0] npm install 成功!")
    else:
        print("[v0] npm install 失败")
else:
    print("[v0] 找不到 package.json")
