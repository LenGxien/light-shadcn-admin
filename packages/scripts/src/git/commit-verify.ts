import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

interface CommitType {
  type: string;
  description: string;
}

const COMMIT_TYPES: Record<string, CommitType> = {
  feat: { type: 'feat', description: '新功能' },
  fix: { type: 'fix', description: '修复bug' },
  docs: { type: 'docs', description: '文档变更' },
  style: { type: 'style', description: '代码格式修改' },
  refactor: { type: 'refactor', description: '代码重构' },
  perf: { type: 'perf', description: '性能优化' },
  test: { type: 'test', description: '测试用例' },
  build: { type: 'build', description: '构建相关' },
  ci: { type: 'ci', description: 'CI配置' },
  chore: { type: 'chore', description: '其他修改' },
  wip: { type: 'wip', description: '开发中' },
  release: { type: 'release', description: '发布相关' },
  deps: { type: 'deps', description: '依赖相关' },
};

const MAX_LENGTH = 100;
const COMMIT_RE = new RegExp(
  `^(revert: )?(${Object.keys(COMMIT_TYPES).join('|')})(?:\\((.+)\\))?: (.{1,${MAX_LENGTH}})$`
);

export function validateCommitMessage(message: string): void {
  if (!message) {
    throw new Error('提交信息不能为空！');
  }

  const match = COMMIT_RE.exec(message);
  if (!match) {
    const types = Object.entries(COMMIT_TYPES)
      .map(([type, info]) => `  ${type.padEnd(8)} : ${info.description}`)
      .join('\n');

    throw new Error(
      `提交消息格式不正确！\n\n` +
        `正确的格式为：<type>[(scope)]: <description>\n\n` +
        `可用的type类型：\n${types}\n\n` +
        `说明：\n` +
        `1. type必须是上述类型之一\n` +
        `2. scope是可选的，用于说明影响范围\n` +
        `3. description是必须的，不超过${MAX_LENGTH}个字符\n\n` +
        `示例：\n` +
        `  feat(auth): 添加用户登录功能\n` +
        `  fix(ui): 修复按钮样式问题`
    );
  }
}

/**
 * 自动查找Git提交消息文件路径
 * 首先尝试使用传入的路径，如果没有传入则尝试查找默认位置
 */
export function findCommitMsgPath(providedPath?: string): string {
  // 如果提供了路径，直接使用
  if (providedPath && fs.existsSync(providedPath)) {
    return providedPath;
  }

  // 尝试查找常见的提交消息文件位置
  const gitDir = execSync('git rev-parse --git-dir', { encoding: 'utf-8' }).trim();
  const possiblePaths = [
    path.join(gitDir, 'COMMIT_EDITMSG'),
    path.join(gitDir, 'MERGE_MSG'),
    path.join(gitDir, 'TAG_EDITMSG'),
    path.join(gitDir, 'SQUASH_MSG'),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }

  throw new Error('无法找到Git提交消息文件，请确保当前目录是Git仓库');
}

export function verifyCommitMessage(msgPath?: string): void {
  const actualPath = findCommitMsgPath(msgPath);
  const msg = fs.readFileSync(actualPath, 'utf-8').trim();
  validateCommitMessage(msg);
}
