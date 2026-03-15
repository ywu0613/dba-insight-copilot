# dba-insight-copilot

DBA Insight Copilot 是一个专为 Oracle DBA 和监控运维人员设计的浏览器侧边栏扩展（Side Panel），用于快速分析、总结 AWR、巡检等 HTML 报告。

## 本地安装与测试指南

目前项目处于 MVP 开发阶段。您可以按照以下步骤在您的 Chrome / Edge 浏览器中安装并测试该原型。

### 1. 获取代码与环境准备
首先，克隆项目代码到本地，并确保您的电脑上已经安装了 [Node.js](https://nodejs.org/) (推荐 v18 或更高版本)。

```bash
# 克隆仓库
git clone https://github.com/ywu0613/dba-insight-copilot.git

# 进入开发目录
cd dba-insight-copilot
```

*(注：原 Vite 默认生成的 `app/README.md` 现已整合并删除。)*

### 2. 编译构建
如果您在本地进行开发或重新拉取了代码，需要编译生成插件包：

```bash
# 进入项目目录
cd "app"

# 安装依赖
npm install

# 编译构建扩展包
npm run build
```

构建完成后，在 `app` 目录下会生成一个 `dist` 文件夹，这就是最终要加载到浏览器中的插件目录。

### 3. 加载到浏览器

**在 Google Chrome 中：**
1. 在浏览器地址栏输入 `chrome://extensions/` 并回车。
2. 打开页面右上角的 **开发者模式 (Developer mode)** 开关。
3. 点击左上角的 **加载已解压的扩展程序 (Load unpacked)** 按钮。
4. 在弹出的文件选择窗口中，选择本项目中的 **`app/dist`** 文件夹。
5. 成功加载后，您会在扩展列表中看到 DBA Insight Copilot。

**在 Microsoft Edge 中：**
1. 在地址栏输入 `edge://extensions/`。
2. 开启左下角的 **开发人员模式 (Developer mode)**。
3. 点击右上角的 **加载解压缩的扩展**，选择 **`app/dist`** 文件夹即可。

### 4. 使用插件
1. 安装成功后，您可以把插件固定到浏览器的工具栏。
2. 点击插件图标，浏览器的右侧便会弹出 **DBA Insight Copilot** 面板。
3. 您可以随便打开一个本地的 html 文件，点击侧边栏进行测试交互。MVP 版本已模拟了核心分析结论卡片以及导出 Markdown 等功能。
