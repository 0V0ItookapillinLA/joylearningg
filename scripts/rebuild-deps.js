import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('[v0] 开始清理和重建依赖...');

try {
  const projectRoot = path.resolve(process.cwd());
  const nodeModulesPath = path.join(projectRoot, 'node_modules');
  const lockFilePath = path.join(projectRoot, 'package-lock.json');

  // 删除 node_modules
  if (fs.existsSync(nodeModulesPath)) {
    console.log('[v0] 删除 node_modules...');
    fs.rmSync(nodeModulesPath, { recursive: true, force: true });
  }

  // 删除 package-lock.json
  if (fs.existsSync(lockFilePath)) {
    console.log('[v0] 删除 package-lock.json...');
    fs.unlinkSync(lockFilePath);
  }

  // 重新安装依赖
  console.log('[v0] 运行 npm install...');
  execSync('npm install', { stdio: 'inherit', cwd: projectRoot });

  console.log('[v0] 依赖重建完成！');
} catch (error) {
  console.error('[v0] 错误:', error.message);
  process.exit(1);
}
