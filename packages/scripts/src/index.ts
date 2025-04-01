#!/usr/bin/env node
import { Command } from 'commander';
import { verifyCommitMessage } from './git/commit-verify';

const program = new Command();

program
  .command('git-commit-verify [msgPath]')
  .description('验证Git提交信息格式，不提供路径时自动查找')
  .action((msgPath?: string) => {
    try {
      verifyCommitMessage(msgPath);
      process.exit(0);
    } catch (error) {
      console.error(`错误：${(error as Error).message}`);
      process.exit(1);
    }
  });

program.parse(process.argv);
