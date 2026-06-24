# Skills

这里收录保险经纪相关的 agent skills、提示词包和工作流辅助工具。

使用前请先阅读仓库首页的风险提示。任何 skill 都可能包含不适合你环境的指令、依赖或安全风险，运行前请先检查源码和 references。

## 当前收录

| Skill | 用途 | 风险等级 |
|---|---|---|
| [insurance-content-storycraft](insurance-content-storycraft/) | 辅助生成、改写和检查保险经纪朋友圈/自媒体内容 | 中：会处理内容素材，必须脱敏并人工复核 |

## 收录建议

新增 skill 时，建议至少包含：

- `README.md`：用途、适用场景、使用方式、风险边界。
- `SKILL.md`：agent 实际读取的主说明。
- `references/`：拆分出来的规则、模板、检查清单或示例。

不要提交真实客户资料、账号密钥、机构内部资料或未经授权的第三方内容。
