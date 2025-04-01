# Light Shadcn Admin

## 项目简介

LightShadcnAdmin 是一个清新优雅、高颜值且功能强大的后台管理模板，基于最新的前端技术栈，包括 Vue3, Vite5, TypeScript, Pinia 和 Tailwind CSS。它内置了丰富的主题配置，代码规范严谨，LightShadcnAdmin 为您提供了一站式的后台管理解决方案，无需额外配置，开箱即用。同样是一个快速学习前沿技术的最佳实践。

## 特性

- 🚀 **前端技术应用** - 采用Vue3、Vite5、TypeScript、Pinia和Tailwind CSS等最新流行的技术栈
- 📝 **严格的代码规范** - 遵循git提交规范，集成了eslint、prettier和simple-git-hooks，保证代码的规范性
- 🔍 **TypeScript** - 支持严格的类型检查，提高代码的可维护性
- 🎨 **丰富的主题配置** - 内置多样的主题配置，与Tailwind CSS完美结合
- 📄 **丰富的页面组件** - 内置多样页面组件，包括403、404、500页面，以及布局组件、标签组件、主题配置组件等
- ⚙️ **命令行工具** - 内置高效的命令行工具，git提交、删除文件、发布等
- 📱 **移动端适配** - 完美支持移动端，实现自适应布局
- 🌐 **浏览器支持** - 支持主流浏览器最新两个版本，包括Chrome、Firefox、Safari、Edge等

## 环境要求

- git: 你需要git来克隆和管理项目版本。
- Node.js 16.0 或更高版本
- pnpm 8.0 或更高版本

### Shadcn/Vue 配置

项目已完成Shadcn/Vue的初始化配置，包括：
- 安装并配置了必要的依赖（Tailwind CSS、Radix Vue等）
- 设置了组件配置文件 `components.json`
- 配置了暗色模式支持
- 设置了组件样式和主题

## 快速开始

### 克隆项目

```bash
git clone https://github.com/LenGxien/light-shadcn-admin.git
cd light-schdcn-admin
```

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建项目

```bash
pnpm build
```

## 项目结构

```
├── src/
│   ├── assets/      # 静态资源
│   ├── components/  # 公共组件
│   │   └── ui/     # Shadcn/Vue UI组件
│   ├── lib/         # 工具函数
│   ├── router/      # 路由配置
│   ├── views/       # 页面组件
│   └── App.vue      # 根组件
├── public/          # 公共资源
└── pages/          # 页面目录
```

## 文档

- [Vue 3 文档](https://vuejs.org/)
- [Vite 文档](https://vitejs.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Shadcn/Vue 文档](https://www.shadcn-vue.com/)
- [VeeValidate 文档](https://vee-validate.logaretm.com/v4/)

## 贡献

欢迎提交问题和改进建议！请确保遵循项目的代码规范和提交规范。

## 许可

[MIT License](LICENSE)
