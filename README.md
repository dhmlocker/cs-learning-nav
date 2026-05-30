# 计算机学习导航 (CS Learning Nav)

计算机相关专业学生的系统化学习与职业发展平台，把课程、知识点、工具、项目、岗位和学习路径连接起来。

## 项目定位

这不是普通博客，也不是单纯的 RAG 问答工具。它帮助用户搞清楚：

- **学什么** — 课程知识库
- **怎么学** — 学习路径
- **用什么工具** — 工具手册
- **能做什么项目** — 项目库
- **对应什么就业方向** — 岗位地图
- **面试可能怎么问** — 面试问题

核心不是内容堆砌，而是**知识关系组织**。

## 技术栈

| 类别 | 技术 |
|------|------|
| 构建 | Vite 5 |
| 框架 | React 18 |
| 语言 | TypeScript 5 |
| 样式 | Tailwind CSS 3 |
| 路由 | React Router 6 |
| 数据 | 本地 TypeScript 文件（第一版 MVP） |

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
    │   └── SearchFilter.tsx     # 通用搜索筛选组件
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
    │   └── PathDetail.tsx       # 学习路径详情页
    ├── data/
    │   ├── index.ts             # 统一导出
    │   ├── courses.ts           # 5 门课程
    │   ├── tools.ts             # 6 个工具
    │   ├── projects.ts          # 5 个项目
    │   ├── jobs.ts              # 5 个岗位
    │   └── paths.ts             # 3 条学习路径
    ├── types/
    │   └── index.ts             # Course/Tool/Project/Job/LearningPath 类型
    └── utils/
        └── filter.ts            # 搜索匹配、难度颜色、去重工具
```

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

## 页面路由

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | Home | 首页，模块入口 + 推荐路径 |
| `/courses` | Courses | 课程列表，搜索 + 分类 + 难度筛选 |
| `/courses/:id` | CourseDetail | 课程详情，含面试问题 + 关联工具/项目/岗位 |
| `/tools` | Tools | 工具列表，搜索 + 分类 + 难度筛选 |
| `/tools/:id` | ToolDetail | 工具详情，含 FAQ + 关联课程 |
| `/projects` | Projects | 项目列表，搜索 + 分类 + 难度筛选 |
| `/projects/:id` | ProjectDetail | 项目详情，含亮点/可扩展点/面试讲法 + 关联 |
| `/jobs` | Jobs | 岗位列表，搜索 + 分类筛选 |
| `/jobs/:id` | JobDetail | 岗位详情，含核心能力/典型任务/面试题 + 关联 |
| `/paths` | Paths | 学习路径列表 |
| `/paths/:id` | PathDetail | 学习路径详情，含阶段内容 + 关联课程/工具/项目/岗位 |

## 数据模型

所有实体之间通过 `relatedCourses`、`relatedTools`、`relatedProjects`、`relatedJobs` 互相关联：

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
relatedTools: string[]    // 当前为 name-based 匹配
relatedProjects: string[]
relatedJobs: string[]

// 各实体特有字段
Course:    interviewQuestions
Tool:      faq
Project:   highlights, extensions, interviewTalkingPoints
Job:       skills, tasks, interviewQuestions
LearningPath: targetJob, stages, interviewQuestions
```

## 第一版 MVP 完成情况

| 功能 | 状态 | 说明 |
|------|------|------|
| 首页 | 已完成 | 系统定位 + 5 个模块入口 + 3 条推荐路径 |
| 课程知识库 | 已完成 | 5 门课程，列表 + 搜索筛选 + 详情页 + 交叉跳转 |
| 工具手册 | 已完成 | 6 个工具，列表 + 搜索筛选 + 详情页 + 交叉跳转 |
| 项目库 | 已完成 | 5 个项目，列表 + 搜索筛选 + 详情页（亮点/可扩展点/面试讲法） |
| 岗位地图 | 已完成 | 5 个岗位，列表 + 搜索筛选 + 详情页（核心能力/典型任务/面试题） |
| 学习路径 | 已完成 | 3 条路径，列表 + 详情页（阶段内容 + 交叉跳转） |
| 搜索与筛选 | 已完成 | 关键词 + 分类 + 难度 + 重置，4 个列表页复用 SearchFilter |
| 关联跳转 | 已完成 | 课程/工具/项目/岗位/路径五向互相导航 |
| 空字段处理 | 已完成 | 所有可选字段条件渲染，不会报错 |
| 不存在 ID | 已完成 | 详情页空状态提示 + 返回按钮 |
| TypeScript | 已完成 | tsc -b 零错误，54 模块构建通过 |

**当前不做：** 后端、数据库、登录注册、用户系统、RAG、AI 问答、后台管理。

## 已知问题

1. **relatedTools 匹配策略不统一**：部分数据使用工具名称引用（如 `gcc`、`pytorch`），而 `relatedCourses`/`relatedProjects`/`relatedJobs` 使用 ID 引用。部分关联工具因数据不完整无法在详情页展示（不报错，仅不显示）。
2. **无全局 404 页面**：访问无效路由会显示空白内容区（导航栏和页脚依然可见）。
3. **Paths 列表页无 SearchFilter**：目前仅 3 条路径，暂未接入搜索筛选组件。

## 后续规划

- [ ] 统一 relatedTools 为 ID 引用，补充缺失的工具数据条目
- [ ] 增加全局 404 页面和通配路由
- [ ] Paths 列表页接入 SearchFilter
- [ ] 推荐学习路径卡片链接到具体详情页
- [ ] 补充更多课程、工具、项目、岗位、路径数据
- [ ] 抽取通用详情页组件，减少重复代码
- [ ] 增加全局搜索（跨模块关键词检索）
- [ ] 增加面包屑导航
- [ ] 后续接入 RAG 智能问答层
- [ ] 用户系统与学习进度追踪

## 部署

### GitHub 上传

```bash
git remote add origin git@github.com:你的用户名/cs-learning-nav.git
git branch -M main
git push -u origin main
```

### Vercel 部署

1. 在 [vercel.com](https://vercel.com) 注册并导入 GitHub 仓库
2. 选择仓库 `cs-learning-nav`
3. 框架自动识别 Vite，无需修改配置
4. Build Command: `npm run build`，Output Directory: `dist`
5. 点击 Deploy — 之后每次 `git push` 自动重新部署

### Netlify 部署

1. 在 [netlify.com](https://netlify.com) 注册并连接 GitHub
2. 选择仓库 `cs-learning-nav`
3. Build Command: `npm run build`，Publish Directory: `dist`
4. 点击 Deploy site

或使用 CLI：

```bash
npx netlify-cli deploy --prod --dir=dist
```

## License

MIT
