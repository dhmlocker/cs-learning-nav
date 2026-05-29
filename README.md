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
    │   └── Paths.tsx            # 学习路径页
    ├── data/
    │   ├── courses.ts           # 5 门课程
    │   ├── tools.ts             # 6 个工具
    │   ├── projects.ts          # 5 个项目
    │   ├── jobs.ts              # 5 个岗位
    │   └── paths.ts             # 3 条学习路径
    ├── types/
    │   └── index.ts             # Course/Tool/Project/Job/LearningPath 类型
    └── utils/
        └── filter.ts            # 筛选工具函数
```

## 本地运行

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 浏览器打开 http://localhost:5173

# 4. 构建生产版本
npm run build

# 5. 预览生产版本
npm run preview
```

## 当前版本功能

### 已完成

| 功能 | 状态 | 说明 |
|------|------|------|
| 首页 | ✅ | 系统定位 + 模块入口 + 学习路径推荐 |
| 课程知识库 | ✅ | 5 门课程，列表 + 搜索筛选 + 详情页 |
| 工具手册 | ✅ | 6 个工具，列表 + 搜索筛选 + 详情页 |
| 项目库 | ✅ | 5 个项目，列表 + 搜索筛选 + 详情页（含亮点/可扩展点/面试讲法） |
| 岗位地图 | ✅ | 5 个岗位，列表 + 搜索筛选 + 详情页（含核心能力/典型任务/面试题） |
| 学习路径 | ✅ | 3 条路线展示，阶段化展示 |
| 搜索与筛选 | ✅ | 关键词 + 分类 + 难度 + 重置（4 个列表页） |
| 详情页关联跳转 | ✅ | 课程 ↔ 工具 ↔ 项目 ↔ 岗位四向导航 |
| 不存在 ID 处理 | ✅ | 空状态提示 + 返回按钮 |
| 响应式布局 | ✅ | 移动端到桌面端适配 |

### 数据模型

所有数据之间互相关联：

```
Course  ←→  Tool  ←→  Project  ←→  Job
  ↕         ↕         ↕          ↕
  └─────────┴─────────┴──────────┘
          LearningPath
```

## 已知问题

1. **relatedTools 数据一致性**：`courses.ts` 和 `projects.ts` 中部分 `relatedTools` 使用工具名称（如 `gcc`、`pytorch`）而非工具 ID，导致少数关联工具无法在详情页展示。后续会统一为 ID 引用。
2. **学习路径**：暂未做详情页和搜索筛选，当前为静态展示页面。
3. **无后端**：当前版本使用本地 TypeScript 数据文件驱动，未接入后端和数据库。

## 后续规划

- [ ] 统一数据关联 ID，消除 relatedTools 名称引用
- [ ] 补充 gcc、pytorch、wireshark 等缺失工具的数据条目
- [ ] 补充更多课程、工具、项目、岗位数据
- [ ] 抽取通用详情页组件（4 个详情页结构相似）
- [ ] 增加全局搜索（跨模块关键词检索）
- [ ] 增加学习路径详情页
- [ ] 增加面包屑导航
- [ ] 后续接入 RAG 智能问答层

## 部署

### GitHub 上传

```bash
# 在项目根目录执行
git init
git add .
git commit -m "feat: 第一版 MVP — 计算机学习导航系统"

# 在 GitHub 创建新仓库 cs-learning-nav 后
git remote add origin git@github.com:你的用户名/cs-learning-nav.git
git branch -M main
git push -u origin main
```

### Vercel 部署

1. 在 [vercel.com](https://vercel.com) 注册并导入 GitHub 仓库
2. 选择仓库 `cs-learning-nav`
3. 框架自动识别 Vite，无需修改配置
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. 点击 Deploy

每次 `git push` 后 Vercel 自动重新部署。

### Netlify 部署

1. 在 [netlify.com](https://netlify.com) 注册并连接 GitHub
2. 选择仓库 `cs-learning-nav`
3. Build Command: `npm run build`
4. Publish Directory: `dist`
5. 点击 Deploy site

或使用 Netlify CLI：

```bash
npx netlify-cli deploy --prod --dir=dist
```

## License

MIT
