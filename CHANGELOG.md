# Changelog

## V1.01 (2026-03-16)

### Added
- 支持上传 `.svg` 文件进行分析（同时保留 `.html/.htm/.txt/.log`）。
- 新增 Oracle 领域白名单关键词设置（可在插件底部“关键词设置”中维护）。
- 关键词白名单支持本地持久化（`localStorage`），支持“恢复默认”。
- 新增一键部署脚本：
  - `deploy.ps1`（PowerShell）
  - `deploy.bat`（Windows 双击运行）
- 新增 PNG 扩展图标资源：`icon-16.png`、`icon-48.png`、`icon-128.png`。

### Changed
- 扩展图标从 SVG 切换为 PNG，提升部署/上架兼容性。
- 对非 Oracle 相关上传内容和提问，改为委婉引导回复。
- README 重构为“快速上手优先”，提供直接进 `app` 与 clone 后一键部署两种路径。
- 版权信息统一为：`青学会MOP技术社区`（界面与导出文档）。

### Version
- 插件版本：`1.0.1`（对应发布标识 `V1.01`）。
