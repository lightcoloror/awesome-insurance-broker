# insurance-content-storycraft

一个用于保险经纪内容创作的 agent skill，重点帮助把零散素材整理成更像真人表达、低销售压迫感、带合规边界的朋友圈、自媒体图文、短视频脚本或直播选题。

## 适合场景

- 保险经纪人想把真实服务经验转成朋友圈或私域内容。
- 想把保险、医疗、家庭风险相关话题讲得更像普通人能听懂的话。
- 想检查文案是否太像 AI、太像硬广、太像标准销售话术。
- 想做内容选题、标题钩子、故事结构、人物视角和合规检查。

## 能做什么

- topic/channel selection
- character and personal IP positioning
- real-experience extraction
- story spine construction
- human voice editing
- distinctive angle selection
- hooks/headlines
- compliance checks
- de-AI cleanup
- iteration

## 使用方式

把整个 `insurance-content-storycraft` 目录放入支持 agent skills 的工具或 agent 环境中。调用时可以让 agent 读取 `SKILL.md`，并按其中的 references 逐步完成选题、故事结构、语言改写和合规检查。

示例请求：

```text
使用 insurance-content-storycraft，帮我把这段真实服务经历改成一条朋友圈文案。要求：不要硬推产品，不承诺理赔或核保结果，语气像普通聊天。
```

```text
使用 insurance-content-storycraft，检查这条保险内容是不是太像 AI，顺便帮我重写成更自然、更低压力的版本。
```

## 安全与合规边界

- 不要把客户姓名、手机号、身份证号、保单号、病历、体检报告、聊天记录原文等敏感信息直接交给模型。
- 不要让 agent 自动发布内容、自动私信客户、自动写入 CRM 或自动创建跟进任务。
- 涉及产品推荐、理赔、核保、健康告知、收益演示、合同条款解释时，必须人工复核。
- 这个 skill 只能辅助生成草稿和检查清单，不能替代持牌合规审核、法律意见、医学意见或正式保险建议。
