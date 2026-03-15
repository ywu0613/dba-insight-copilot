export const exportToMarkdown = () => {
  const content = `# DBA Insight Copilot 分析报告

## 总体结论
当前瓶颈主要集中在单块读等待与高 Buffer Gets SQL。本次问题更偏向 IO 与执行计划问题，而非 CPU 饱和。

## 风险摘要
- 高风险：高 Buffer Gets SQL 暴增 (Top 1 SQL 占用了 45% 的逻辑读。)
- 高风险：单块读延迟上升 (db file sequential read 平均延迟达到 15ms。)
- 中风险：硬解析过高 (每秒硬解析超过 100 次，需排查绑定变量使用。)

## 优化建议
1. 优先核查 Top SQL 执行计划 (核查 sql_id: 1a2b3c4d5e...)
2. 检查存储层 IO 延迟 (单块读飙升可能与存储层响应变慢有关...)

> 生成自 DBA Insight Copilot
`;
  
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'DBA_Analysis_Report.md';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportToPDF = () => {
  window.print();
};
