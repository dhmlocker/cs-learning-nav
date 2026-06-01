# CodeAtlas｜项目驱动学习平台

一个以真实项目库为入口的计算机学习结构系统。不是 AI 教程站，也不是普通资源站，而是把真实项目、任务流程、具体知识点、课程、工具、学习路径、岗位和资源组织成可执行的项目驱动学习平台。

## 项目定位

- 学什么 → 为什么学 → 怎么学 → 用什么工具 → 能做什么项目 → 对应什么就业方向
- 核心不是内容堆砌，而是**知识关系组织**
- 所有内容通过 `relatedCourses` / `relatedTools` / `relatedProjects` / `relatedJobs` 互相关联

## 当前版本：CodeAtlas 5.0

本轮重点是全站结构纠偏：

- 项目、课程、工具、学习路径、岗位统一采用"列表页 → 总览页 → 可点击目录 → 子详情页"结构
- 项目全部替换为真实开源项目 / 官方示例 / 成熟教程
- 删除 AI 生成的项目亮点、面试讲法、面试追问等内容
- 工具和岗位补齐基于真实资源的 usageScenarios 和 skillModules
- 总览页只看目录，子详情页才看详细内容

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
| 课程 (Courses) | 10 | 含学习目标、章节目录、实践任务 |
| 工具 (Tools) | 15 | 含使用场景、安装配置、常用命令、资源链接 |
| 项目 (Projects) | 10 | 来自 freeCodeCamp / The Odin Project / 官方教程等真实来源 |
| 岗位 (Jobs) | 10 | 含能力模块、技能点、关联资源、面试准备 |
| 学习路径 (Paths) | 3 | 含阶段目录、关联课程/项目/工具、最终产出 |
| **合计** | **48** | 全部实体互相关联 |

## 页面路由

| 路由 | 页面 |
|------|------|
| `/` | 首页 |
| `/courses` `/courses/:id` `/courses/:id/units/:unitId` | 课程模块 |
| `/tools` `/tools/:id` `/tools/:id/uses/:useId` | 工具模块 |
| `/projects` `/projects/:id` `/projects/:id/tasks/:taskId` | 项目模块 |
| `/jobs` `/jobs/:id` `/jobs/:id/modules/:moduleId` | 岗位模块 |
| `/paths` `/paths/:id` `/paths/:id/stages/:stageId` | 学习路径模块 |
| `/search` | 全站搜索 |

## 本地运行

```bash
npm install
npm run dev
```

浏览器访问 http://localhost:5173

## 构建检查

```bash
npx tsc -b
npm run build
```

## Vercel 部署

1. 打开 [Vercel Dashboard](https://vercel.com)，点击 Add New / New Project
2. Import Git Repository → 连接 GitHub → 选择本仓库
3. 配置如下：

| 配置项 | 值 |
|--------|-----|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install`（默认即可） |
| Root Directory | 默认（package.json 在仓库根目录） |

4. 点击 Deploy，之后每次 `git push` 自动重新部署

## 当前限制

- 无后端、无数据库、无登录注册、无用户系统
- 无 RAG / AI 问答
- 无后台管理系统
- 所有数据为静态本地文件

## License

MIT
