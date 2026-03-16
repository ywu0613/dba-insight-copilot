# dba-insight-copilot

DBA Insight Copilot 是一个专为 Oracle DBA 和监控运维人员设计的浏览器侧边栏扩展（Side Panel），用于快速分析、总结 AWR、巡检等 HTML 报告。

当前版本：`V1.01`（技术版本号 `1.0.1`）

## 本地安装与测试指南

目前项目处于 MVP 开发阶段。下面给你 3 种最常用方式，优先看“方式 A / B”。

### 方式 A：已经在仓库目录，直接构建（最短路径）

```bash
cd app
npm install
npm run build
```

### 方式 B：clone 后一条命令完成构建（Windows PowerShell）

```powershell
git clone https://github.com/ywu0613/dba-insight-copilot.git; cd dba-insight-copilot; .\deploy.ps1
```

如果本机执行策略限制了脚本，可用：

```powershell
git clone https://github.com/ywu0613/dba-insight-copilot.git; cd dba-insight-copilot; powershell -ExecutionPolicy Bypass -File .\deploy.ps1
```

### 方式 C：双击一键构建（Windows）

在仓库根目录直接双击 `deploy.bat`，会自动执行：
1. 进入 `app`
2. `npm install`
3. `npm run build`

### 构建结果

构建完成后，在 `app` 目录下会生成 `dist` 文件夹。  
`app/dist` 就是最终要加载到浏览器的插件目录，不需要额外打包工具。

> 说明：插件图标已使用 PNG（`icon-16/48/128.png`），避免部署流程对 SVG 图标不兼容的问题。

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
3. 您可以上传本地 `.html/.txt/.log/.svg` 文件并进行测试交互。MVP 版本已模拟核心分析结论卡片与导出能力。
4. 当前插件聚焦 Oracle 数据库场景；如果上传文件或提问与 Oracle 无关，会收到委婉提示并引导回 Oracle 主题。
5. 如需调整 Oracle 识别规则，可在底部点击“关键词设置”维护白名单（本地保存）。

---

版权：青学会MOP技术社区
