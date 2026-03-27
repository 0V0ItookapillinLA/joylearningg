import { execSync } from "child_process";
import { rmSync, existsSync } from "fs";
import { join } from "path";

const rootDir = process.cwd();
const nodeModulesPath = join(rootDir, "node_modules");
const lockFilePath = join(rootDir, "package-lock.json");

console.log("[v0] 开始清理损坏的依赖...");

try {
  // 删除 node_modules
  if (existsSync(nodeModulesPath)) {
    console.log("[v0] 删除 node_modules 目录...");
    rmSync(nodeModulesPath, { recursive: true, force: true });
  }

  // 删除 package-lock.json
  if (existsSync(lockFilePath)) {
    console.log("[v0] 删除损坏的 package-lock.json...");
    rmSync(lockFilePath, { force: true });
  }

  // 运行 npm install
  console.log("[v0] 运行 npm install...");
  execSync("npm install", {
    cwd: rootDir,
    stdio: "inherit",
    env: { ...process.env, npm_config_legacy_peer_deps: "true" },
  });

  console.log("[v0] 依赖安装完成！");
} catch (error) {
  console.error("[v0] 安装过程中出错:", error.message);
  process.exit(1);
}
