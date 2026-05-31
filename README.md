# 计算机学习导航 (CS Learning Nav)

计算机相关专业学生的系统化学习与职业发展平台。把课程、工具、项目、岗位和学习路径连接起来，帮助用户搞清楚学什么、怎么学、用什么工具、能做什么项目、对应什么就业方向。

核心不是内容堆砌，而是**知识关系组织**。

## 技术栈

| 类别 | 技术 |
|------|------|
| 构建 | Vite 5 |
| 框架 | React 18 |
| 语言 | TypeScript 5 |
| 样式 | Tailwind CSS 3 |
| 路由 | React Router 6 |
| 数据 | 本地 TypeScript 文件 |

## 数据规模

| 模块 | 数量 | 说明 |
|------|------|------|
| 课程 (Courses) | 10 | 含学习目标、章节目录、实践任务、推荐资源、学习建议 |
| 工具 (Tools) | 15 | 含使用场景、安装配置、常用命令、工作流建议、常见问题 |
| 项目 (Projects) | 10 | 含项目目标、功能模块、开发步骤、验收标准、面试讲法 |
| 岗位 (Jobs) | 10 | 含核心能力、学习计划、作品集建议、面试重点、成长路径 |
| 学习路径 (Paths) | 3 | 含详细学习阶段、关联资源、最终成果、求职准备清单 |
| **合计** | **48** | **263 条交叉引用，零断链** |

## 目录结构

```
cs-learning-nav/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
└── src/
    ├── main.tsx                 # 入口
    ├── App.tsx                  # 路由配置
    ├── index.css                # Tailwind 基础样式
    ├── components/
    │   ├── Layout.tsx           # 公共布局（导航栏 + 页脚）
    │   ├── SearchFilter.tsx     # 通用搜索筛选组件
    │   ├── DetailHeader.tsx     # 通用详情页头部
    │   ├── RelatedSection.tsx   # 通用关联内容区域
    │   └── QuestionList.tsx     # 通用问答列表
    ├── pages/
    │   ├── Home.tsx             # 首页
    │   ├── Courses.tsx          # 课程列表页
    │   ├── CourseDetail.tsx     # 课程详情页
    │   ├── Tools.tsx            # 工具列表页
    │   ├── ToolDetail.tsx       # 工具详情页
    │   ├── Projects.tsx         # 项目列表页
    │   ├── ProjectDetail.tsx    # 项目详情页
    │   ├── Jobs.tsx             # 岗位列表页
    │   ├── JobDetail.tsx        # 岗位详情页
    │   ├── Paths.tsx            # 学习路径列表页
    │   ├── PathDetail.tsx       # 学习路径详情页
    │   └── Search.tsx           # 全站搜索页
    ├── data/
    │   ├── index.ts             # 统一导出
    │   ├── courses.ts           # 10 门课程
    │   ├── tools.ts             # 15 个工具
    │   ├── projects.ts          # 10 个项目
    │   ├── jobs.ts              # 10 个岗位
    │   └── paths.ts             # 3 条学习路径
    ├── types/
    │   └── index.ts             # Course / Tool / Project / Job / LearningPath 类型定义
    └── utils/
        ├── filter.ts            # 搜索匹配、难度颜色、去重工具
        └── search.ts            # 全站搜索（跨五类数据检索）
```

## 数据模型

五类实体通过 `relatedCourses`、`relatedTools`、`relatedProjects`、`relatedJobs` 互相关联，所有 ID 引用均可从任一实体跳转到关联实体。

```ts
// 核心共享字段
id: string
title: string             // Tool 使用 name
description: string
category: string
tags: string[]
difficulty: '入门' | '基础' | '进阶' | '高级'

// 关联字段
relatedCourses: string[]
relatedTools: string[]
relatedProjects: string[]
relatedJobs: string[]

// ===== Course 学习内容字段（可选） =====
learningObjectives?: string[]
prerequisites?: string[]
chapters?: { title, summary, keyPoints, exercises? }[]
practiceTasks?: string[]
recommendedResources?: { title, type: '书籍'|'视频'|'文章'|'工具' }[]
learningTips?: string[]

// ===== Project 实战任务字段（可选） =====
projectGoals?: string[]
targetUsers?: string[]
prerequisites?: string[]
featureModules?: { title, description, tasks[] }[]
developmentSteps?: { title, description, checklist[] }[]
acceptanceCriteria?: string[]
interviewFollowups?: string[]

// ===== Tool 工具手册字段（可选） =====
useCases?: string[]
setupSteps?: string[]
commonCommands?: { command, description }[]
workflowTips?: string[]
commonProblems?: { problem, solution }[]
relatedScenarios?: string[]

// ===== Job 求职准备字段（可选） =====
requiredAbilities?: string[]
learningPlan?: { phase, focus, duration }[]
portfolioAdvice?: string[]
interviewFocus?: string[]
growthPath?: string[]
commonMistakes?: string[]

// ===== LearningPath 任务化字段（可选） =====
learningStages?: { name, description, courseIds[], projectIds[], toolIds[], goals[], checklist[] }[]
finalOutcomes?: string[]
portfolioProjects?: { title, description, techStack[] }[]
jobReadiness?: string[]
```

所有新字段均为可选（`?`），页面条件渲染，不存在时不展示对应区域。

## 页面路由

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | Home | 首页，含"从哪里开始"三段引导、模块入口、知识关系说明、推荐路径 |
| `/courses` | Courses | 课程列表，关键词搜索 + 分类 + 难度筛选 |
| `/courses/:id` | CourseDetail | 课程详情，含学习目标、先修知识、章节目录、实践任务、推荐资源、学习建议、面试问题、关联跳转 |
| `/projects` | Projects | 项目列表，关键词搜索 + 分类 + 难度筛选 |
| `/projects/:id` | ProjectDetail | 项目详情，含项目目标、适合人群、前置知识、功能模块、开发步骤、验收标准、面试讲法、关联跳转 |
| `/tools` | Tools | 工具列表，关键词搜索 + 分类 + 难度筛选 |
| `/tools/:id` | ToolDetail | 工具详情，含使用场景、安装配置、常用命令、工作流建议、常见问题、关联跳转 |
| `/jobs` | Jobs | 岗位列表，关键词搜索 + 分类筛选 |
| `/jobs/:id` | JobDetail | 岗位详情，含核心能力、学习计划、作品集建议、面试重点、成长路径、常见误区、关联跳转 |
| `/paths` | Paths | 学习路径列表，关键词搜索 + 难度筛选 |
| `/paths/:id` | PathDetail | 学习路径详情，含阶段概要、详细学习计划（含关联资源链接）、最终成果、作品集项目、求职准备清单、关联跳转 |
| `/search` | Search | 全站搜索，跨五类数据检索、URL query 同步、关键词高亮、类型筛选 |

## 版本演进

| 阶段 | 内容 | 状态 |
|------|------|------|
| v0.1 MVP | Vite + React + TypeScript + Tailwind 项目搭建，5 模块列表页 + 基础详情页，搜索筛选，48 条示例数据 | 完成 |
| 数据扩充与关系治理 | 统一 relatedTools 为 ID 引用，补充缺失数据，确保所有实体间双向关联完整 | 完成 |
| 全站搜索 | `/search` 页面，跨五类数据检索，URL 同步，关键词高亮，类型筛选 | 完成 |
| 学习路径体验优化 | Paths 列表页统计徽章 + 阶段箭头链摘要，PathDetail 概览卡片 + 阶段学习顺序 | 完成 |
| 课程学习内容层 | Course 新增 6 个可选字段，10 门课程全部填充章节目录、实践任务、推荐资源、学习建议等 | 完成 |
| 项目实战任务层 | Project 新增 7 个可选字段，10 个项目全部填充项目目标、功能模块、开发步骤、验收标准等 | 完成 |
| 学习路径任务化 | LearningPath 新增 4 个可选字段，3 条路径全部填充详细学习阶段、关联资源、最终成果、求职清单 | 完成 |
| 工具手册层 | Tool 新增 6 个可选字段，15 个工具全部填充使用场景、安装配置、常用命令、工作流建议、常见问题 | 完成 |
| 岗位求职准备层 | Job 新增 6 个可选字段，10 个岗位全部填充核心能力、学习计划、作品集建议、面试重点、成长路径 | 完成 |
| 首页信息架构优化 | 新增"从哪里开始"三段引导、知识关系说明区域，保留原有模块入口和推荐路径 | 完成 |
| 全站验收 | 12 页功能验证，263 条交叉引用零断链，TypeScript 零错误，构建通过 | 通过 |

## 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
# 浏览器访问 http://localhost:5173

# 类型检查
npx tsc -b

# 生产构建
npm run build

# 预览构建产物
npm run preview
```

## 当前限制

- 无后端、无数据库、无登录注册、无用户系统
- 无 RAG / AI 问答
- 无后台管理系统
- 无全局 404 页面（无效路由显示空白内容区，导航栏和页脚正常）
- 无面包屑导航
- 所有数据为静态本地文件，内容仅供演示

## 后续规划

以下均为可选项，不阻塞当前版本封版：

- [ ] 全局 404 页面和通配路由
- [ ] 面包屑导航
- [ ] 后台管理系统（内容 CRUD）
- [ ] 数据库持久化
- [ ] 用户系统与学习进度追踪
- [ ] RAG 智能学习助手

## 部署

### Vercel

1. 在 [vercel.com](https://vercel.com) 注册并导入 GitHub 仓库
2. 选择仓库 `cs-learning-nav`
3. 框架自动识别 Vite，无需修改配置
4. Build Command: `npm run build`，Output Directory: `dist`
5. 点击 Deploy — 之后每次 `git push` 自动重新部署

### Netlify

1. 在 [netlify.com](https://netlify.com) 注册并连接 GitHub
2. 选择仓库 `cs-learning-nav`
3. Build Command: `npm run build`，Publish Directory: `dist`
4. 点击 Deploy site

或使用 CLI：

```bash
npx netlify-cli deploy --prod --dir=dist
```

### GitHub Pages

```bash
git remote add origin git@github.com:你的用户名/cs-learning-nav.git
git branch -M main
git push -u origin main
```

## License

MIT
