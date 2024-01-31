# WTF Frontend

## Getting Started
```shell
cp .env.sample .env
pnpm install
pnpm start
```

## 命名规范
- 文件夹名：
  - 组件文件夹：大驼峰命名法
  - 其他文件夹：短横线命名法
- 文件名：
  - 组件：大驼峰命令
  - context：大驼峰命名
  - hook：小驼峰命名
  - 其他文件：短横线命名法
- 类型定义：
  - type类型：T + 名字
  - interface类型：I + 名字
  - enum类型：E + 名字
  - 其他类型：名字
- 变量名：
  - 常量：大写字母 + 下划线
  - 其他变量：小驼峰命名

## 目录结构
```
├── docs // 文档相关
├── plugins // docusaurus插件
├── src
│   ├── components // 组件
│   │   ├── ui // 基础UI组件
│   ├── contexts // 全局context
│   ├── hooks  // 全局hook
│   ├── pages  // 页面
│   ├── styles // 全局样式
│   ├── types  // 全局类型定义
│   ├── utils  // 全局工具函数
```

## 如何创建一个shadcn组件

#### 1. 创建组件文件
在`src/components/ui`目录下创建一个文件夹，文件夹名为组件名，组件名使用大驼峰命名法，如`Button`。

#### 2. 打开[shadcn页面](https://ui.shadcn.com/docs/components/button)，打开Manual Installation选项，按步骤复制代码

#### 3. 变动组件文件内class utils的文件引入路径
```
import { cn } from "@/lib/utils" --> import { cn } from "@site/src/utils/class-utils"
```

## Q&A

1. alias使用
```
使用@site开头的别名路径
```

2. pages书写规范
```
根据docusaurus的规范，pages下的文件夹名为路由名，使用"_"标记的组件不会当做一个页面来创建路由
```
