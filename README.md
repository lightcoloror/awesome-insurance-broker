# Awesome Insurance Broker

一个面向保险经纪从业者和相关研究者的资料与工具集合。

这个仓库希望沉淀一些有助于日常学习、客户沟通、资料整理、工作流建设和 AI 辅助实践的内容，包括但不限于：

- 保险经纪相关资料与学习笔记
- 客户沟通、需求分析、保障梳理等工作模板
- Agent skills、提示词、自动化脚本和轻量工具
- 公开资源、案例、方法论和实践经验

> 本仓库不是保险销售建议、法律意见、合规意见或投资建议。请结合所在地区的监管要求、所在机构制度和个人执业资质谨慎使用。

## 当前收录

### Skills

- [insurance-content-storycraft](skills/insurance-content-storycraft/)：辅助生成、改写和检查保险经纪朋友圈/自媒体内容。使用前请先脱敏素材，并对产品、核保、理赔、健康告知和合规边界进行人工复核。
- [daily-logseq-review-plan](skills/daily-logseq-review-plan/)：辅助生成每日 Logseq 复盘与计划审核稿，默认只产出待人工审核内容，不直接写回 Logseq。

### 相关项目

- [aibao2026/aibaoguwen](https://github.com/aibao2026/aibaoguwen)：本地优先的保险客户工作日历，面向生日、保单续期、客户回访和手动待办等日常跟进场景。
- [lightcoloror/ebook-markdown-pipeline](https://github.com/lightcoloror/ebook-markdown-pipeline)：本地图文材料转换器，可把电子书、PDF、Office 文档、截图、图片集和网页归档转成 Markdown、质量报告和 agent 友好的交付物，适合整理保险学习资料和课程材料。

#### 通用 Agent 工作流

- [OthmanAdi/planning-with-files](https://github.com/OthmanAdi/planning-with-files)：通用的文件化规划 skill，让 AI 在长任务中持续维护 `task_plan.md`、`findings.md` 和 `progress.md`，适合资料整理、工具开发、长期任务和多 agent 协作。注意：该 skill 使用 hooks 和 shell/PowerShell 脚本，安装前应先做源码审查，且不要把真实客户信息写入计划文件。

## 镜像同步

本仓库以 GitHub 为主仓库，Gitee 作为国内访问镜像。推荐使用 Gitee 自带的 **Pull 镜像** 功能，由 Gitee 从 GitHub 拉取更新。

默认目标：

- GitHub：`github.com/lightcoloror/awesome-insurance-broker`
- Gitee：`gitee.com/bingcan-huang/awesome-insurance-broker`

配置方式：

1. 在 Gitee 创建同名仓库 `awesome-insurance-broker`。
2. 进入 Gitee 仓库的 `管理 -> 仓库镜像`。
3. 选择 `Pull` 方向：从 GitHub 同步到 Gitee。
4. 镜像仓库选择或填写 `lightcoloror/awesome-insurance-broker` 作为 GitHub 来源仓库；Gitee 镜像仓库地址为 `bingcan-huang/awesome-insurance-broker`。
5. 在 GitHub 创建仅用于同步的私人令牌，并填入 Gitee 的“私人令牌”输入框。
6. 如需自动同步，在 Gitee 勾选“自动从 GitHub 同步仓库”，并按页面提示给 GitHub 令牌增加 webhook 相关授权。

不要同时启用 GitHub Actions Push 同步和 Gitee Pull 镜像同步，避免两套机制重复推拉。不要把 GitHub 私人令牌、Gitee Token、Cookie 或账号密码提交到仓库。

## 风险提示

本仓库可能收录社区成员分享的 skills、脚本、提示词、配置文件或其他工具。这些内容不一定经过完整安全审计，也不保证适合你的运行环境。

请特别注意：

- **skills 或脚本可能包含恶意代码**，例如读取本地文件、上传敏感信息、修改系统配置、执行外部命令等。
- **提示词也可能有风险**，例如诱导模型泄露隐私、绕过安全边界、生成不合规内容，或把客户信息发送给第三方服务。
- **自动化工具可能造成误操作**，例如错误生成客户建议、误发消息、覆盖文件、误删数据或触发不合规流程。
- **外部链接和依赖可能变化**，原本安全的项目、包、网页或接口，后续可能被替换、失效或被植入风险内容。

使用任何第三方内容前，请至少做到：

1. 先阅读源码、配置和依赖，不要直接运行不理解的代码。
2. 优先在沙箱、虚拟机、容器或测试账号中试用。
3. 不要把客户姓名、手机号、身份证号、保单号、病历、财务状况等敏感信息交给未验证工具。
4. 不要把 API Key、Token、Cookie、账号密码写入公开文件、skills、提示词或示例配置。
5. 涉及投保建议、产品比较、健康告知、理赔协助等场景时，必须进行人工复核。

## 使用边界

本仓库内容主要用于学习、研究和个人工作流改进。保险业务具有很强的地域、监管、产品和机构差异，任何模板或工具都不能替代专业判断。

尤其在以下场景中，请不要直接依赖自动化输出：

- 具体产品推荐、费率比较、投保结论
- 健康告知、核保判断、既往症解释
- 理赔判断、法律责任、合同条款解释
- 客户资产、家庭结构、医疗信息等敏感数据处理
- 任何会直接影响客户决策或客户权益的内容

建议把 AI 和自动化工具当作“草稿生成器、资料整理器、检查清单生成器”，而不是最终决策者。

## 推荐目录结构

可以按下面的方式组织内容：

```text
.
├── README.md
├── skills/          # Agent skills、提示词包、工具说明
├── templates/       # 客户沟通、需求分析、保障梳理等模板
├── workflows/       # 工作流、SOP、自动化流程
├── resources/       # 公开资料、学习链接、阅读笔记
├── examples/        # 脱敏示例和演示材料
└── tools/           # 脚本、小工具、辅助程序
```

## 贡献内容建议

欢迎提交 PR 或 Issue。为了方便他人判断内容是否可用，建议每个新增条目尽量说明：

- 内容用途：它解决什么问题，适合什么场景。
- 使用方法：如何安装、配置、运行或调用。
- 输入输出：需要哪些输入，会生成哪些结果。
- 风险说明：是否会读写本地文件、访问网络、调用外部 API、处理客户信息。
- 依赖来源：使用了哪些第三方包、模型、服务或开源项目。
- 适用边界：哪些场景不能使用，哪些结果必须人工复核。

如果提交的是 skill 或脚本，请尽量附上最小示例和安全说明。

## Skill 安全检查清单

在收录或运行一个 agent skill 前，建议检查：

- 是否会执行 shell、PowerShell、Python、Node.js 或其他系统命令。
- 是否会读取、写入、删除或上传本地文件。
- 是否会访问网络、调用未知 API 或下载远程代码。
- 是否要求填入 Token、Cookie、密钥或账号密码。
- 是否会处理客户隐私、健康信息、财务信息或保单信息。
- 是否有明确的人工复核步骤。
- 是否说明了适用范围、失败处理和回滚方式。

不清楚的内容，不要直接运行。

## 隐私与合规

分享案例、模板或演示材料时，请先完成脱敏处理，避免暴露客户、机构、同事或合作方的真实信息。

请勿提交：

- 客户姓名、联系方式、证件号、住址、保单号
- 病历、体检报告、健康告知、理赔材料
- 未公开的产品资料、机构内部资料或客户沟通记录
- API Key、访问令牌、Cookie、私钥、账号密码

如不确定某项内容是否适合公开，建议先不要提交。

## License

本仓库采用的许可证组合：

- 代码、脚本、工具、agent skills：默认使用 **GNU Affero General Public License v3.0 or later (AGPL-3.0-or-later)**。
- 文档、模板、清单、学习笔记、资料整理：默认使用 **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)**。

简单理解：

- 你可以学习、复制、修改和再分发。
- 如果你基于本仓库内容做了修改并分发，应继续使用相同或兼容的开放许可证。
- 如果你把 AGPL 授权的代码或工具改造成网络服务提供给他人使用，也需要按 AGPL 要求提供相应源码。
- 使用本仓库内容不代表作者对结果的正确性、安全性、合规性或适销性作出保证。

如果某个文件单独声明了许可证，以该文件内的声明为准。
