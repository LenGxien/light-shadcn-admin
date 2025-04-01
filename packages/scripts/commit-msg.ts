#!/usr/bin/env node
import fs from 'node:fs';

const msgPath = process.argv[2];
const msg = fs.readFileSync(msgPath, 'utf-8').trim();

const commitRE =
  /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release|deps)(\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
  console.error(`
  错误的提交消息格式。
  请遵循以下格式：
    feat(模块): 添加了新功能
    fix(模块): 修复了某个bug
    docs(模块): 更新了文档
    style(模块): 代码格式修改
    refactor(模块): 代码重构
    perf(模块): 性能优化
    test(模块): 测试用例相关
    build(模块): 构建相关
    ci(模块): CI配置相关
    chore(模块): 其他修改
    wip(模块): 开发中
    release(模块): 发布相关
    deps(模块): 依赖相关
  `);
  process.exit(1);
}
