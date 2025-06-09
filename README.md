# 我的故事集

这是一个使用 Next.js 构建的个人故事集网站。所有故事都使用 Markdown 格式编写，并自动渲染为网页。

## 本地开发

1. 克隆仓库
```bash
git clone https://github.com/your-username/stories.git
cd stories
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 在浏览器中访问 [http://localhost:3000](http://localhost:3000)

## 添加新故事

1. 在 `contents` 目录下创建新的 `.md` 文件
2. 使用以下格式编写故事：

```markdown
---
title: "故事标题"
date: "YYYY-MM-DD"
author: "作者名"
tags: ["标签1", "标签2"]
description: "故事描述"
---

故事内容...
```

## 部署

网站会自动部署到 GitHub Pages。每次推送到 `main` 分支时，GitHub Actions 会自动构建并部署网站。

访问地址：https://your-username.github.io/stories/
