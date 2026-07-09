---
name: daily-logseq-review-plan
description: Draft or refine daily Logseq journal plans and reviews from the current weekly plan, monthly goals, yesterday/today journals, and user-provided latest prioritization. Use when the user asks for 每日总结计划, 今日计划, 明日计划, 日复盘, journal模板, daily Logseq journal filling, or daily minimum-closed-loop planning while preserving human review before any Logseq writeback.
---

# Daily Logseq Review Plan

Use this skill to produce a reviewable daily Logseq journal draft or refinement. Treat the user's original daily review/planning flow as the operating procedure, and treat `journal模板` as the output skeleton. Logseq is the source of truth, Obsidian is AI-organized reference, and local Markdown is fallback only.

## Source Rules

1. Check Logseq API first with `D:\used-by-codex\scripts\logseq-api.cmd status`.
2. Prefer Logseq API reads through `D:\used-by-codex\scripts\logseq-api.cmd run ...`.
3. If API is unavailable, read Markdown from `D:\used by syncthing\logseq sync\pages` and `D:\used by syncthing\logseq sync\journals`.
4. Use Obsidian MCP for AI knowledge-base references when available. If MCP fails or points to a different vault, use local Obsidian-exported reference files only as secondary guidance.
5. Never ask for or print `LOGSEQ_API_TOKEN`.
6. Never write to Logseq, overwrite Logseq Markdown, or apply API writeback unless the user explicitly approves the exact write operation.

## Source Of Procedure

Before drafting, align with these Logseq pages when available:

1. `[[journal模板]]`: the current journal output skeleton. Use the latest journal template unless the user explicitly asks for another version. The current latest version is 6.0.
2. `[[每日复盘、计划、执行流程]]`: the real daily operating flow. This is more important than inventing a polished AI plan.
3. `[[每日总结计划看板]]`: use as a progress/context checkpoint when available.
4. Current weekly and monthly plans: only to decide tomorrow's one long-term minimum action and 0-2 fixed constraints/maintenance items.
5. `schedule-planner`: before drafting the daily plan, check schedule-planner for the target day's time blocks, conflicts, workout/rest arrangement, family anchors, and blocked dependencies. Use the local tool registry and `D:\used-by-codex\schedule-planner\AGENT_DISCOVERY.md` for the current stable interface. Keep all schedule-planner writebacks behind its own human-review rules.
6. `vibe-living`: when the daily plan touches insurance, CRM, customers, content素材, M1人工确认, or business-loop work, read `D:\used-by-codex\docs\local-tools\vibe-living-AGENT_DISCOVERY.md` and use its CLI only as a business-candidate and blocker source. Keep customer confirmation, CRM mutation, and Logseq writeback behind human review.
7. `D:\used by syncthing\obsidian sync\AI-obsidian\保险经纪前 1% 学习系统.md`: when the daily plan touches insurance capability growth, customer action, service samples, content素材, or "busy with tools vs real practice" judgment, use this Obsidian note as secondary guidance for deliberate-practice framing. Do not write it back to Logseq or expand it into tool development.
8. `D:\used by syncthing\obsidian sync\AI-obsidian\人生规划系统重构\亲密关系经营：哄老婆开心学习系统.md`: when the daily plan touches spouse relationship, family/relationship constraints, date/ritual arrangements, or repair after conflict, use this Obsidian note as secondary guidance for intimate-relationship practice. Do not write it back to Logseq unless the user explicitly approves.
9. Historical `#每日一句` entries in Logseq journals: use them as style examples when drafting a new daily quote. They usually contain famous quotes, self-motivation, self-examination, self-improvement, or self-reminder principles, sometimes with an author/source.
10. `energy_readiness.v1`: when available, use it only as a planning-intensity gate and review observation. Keep the first 14-28 days as `baseline_building`; do not make medical claims or hard conclusions from a single device metric.

## Schedule Planner Integration

Use schedule-planner as the execution-scheduling layer, not as the goal system. Logseq daily planning decides goals, review, tradeoffs, and the minimum closed loop; schedule-planner checks time blocks, dependencies, conflicts, and schedule feasibility.

Before drafting or refining a daily plan:

1. Read `D:\used-by-codex\tool-registry.json` and `D:\used-by-codex\schedule-planner\AGENT_DISCOVERY.md` if this turn has not already loaded the current schedule-planner interface.
2. Run `node D:\used-by-codex\schedule-planner\scripts\schedule-planner-cli.mjs workflow auto-dry-run` when available before trusting generated schedule evidence.
3. Prefer the current `workflow-auto-*` artifacts from that run, especially `workflow-auto-status.json`, `workflow-auto-solver-input.json`, `workflow-auto-export.json`, and `workflow-auto-review-brief.md`. Treat older `workflow-status.json` or `workflow-solver-input.json` as stale unless the user explicitly asks to inspect old workflow output.
4. If `generatedAt`, `startDate`, or `inboxFile` is stale, missing, or unknown, say the schedule-planner result is stale and do not use it as a hard scheduling fact.
5. Extract only the planning-relevant facts:
   - today's fixed or likely time blocks;
   - blockers and dependency chains;
   - workout/rest arrangement;
   - family dinner/child-care anchors or recovery windows;
   - calendar preflight hard conflicts or warnings.
6. Use these facts to shrink, reorder, or move tasks, not to add more tasks.

For `#每日锻炼`, distinguish true hard conflicts from default protective family anchors. Evening child-care is a default constraint, but if the user explicitly arranged badminton, a client meeting, a date, or confirmed that child-care is not needed, treat it as an override candidate rather than a hard blocker. If schedule-planner reports workout blocked only by an unconfirmed default family anchor, write it as `需要确认/可覆盖默认约束` and still offer a small workout or recovery fallback.

After drafting the daily plan, include a short **今日可排期项审核包** outside the journal body when useful. It should list only candidate blocks for human review, for example:

- high-cognition block for the one `#长期目标最小行动`;
- workout/rest block or explicit rest;
- family anchor or recovery window;
- one bounded low-cognition block for tools, account, or admin work.

When useful, include a short **今日边界** section outside the journal body. Use it for "do not do / do not enter today's mainline / do not expand / do not add" constraints. Do not put these negative boundary statements under `🧩#其他事项`, because that makes them look like actionable to-dos.

Do not auto-write the schedule-planner review package to Logseq, Google Calendar, Vikunja, Airtable, or any external calendar/task system. If schedule-planner reports `decision.canRequestLiveWrite=false`, do not request or suggest live writeback.

## Energy Readiness Integration

Use `energy_readiness.v1` as a lightweight planning gate, not as a medical or productivity scorecard. It may come from vibe-living, schedule-planner dry-run context, or a user-provided readiness summary.

For daily planning, translate the record into minimal journal language:

- `#今日精力灯 ：green/yellow/red/unknown；status：baseline_building；原因：...`
- keep one `#长期目标最小行动`;
- write any active downgrade under `🧩#其他事项`, not Inbox;
- include an offline fallback when the selected action depends on tools.

For daily review, use the new `#每日 #复盘精力灯` line to answer only:

- was the morning judgment accurate;
- how focus, training, and emotion actually performed;
- which signal explained the day best;
- which signal looked like noise.

During `baseline_building`, write observations such as `只记录观察，不宣布结论`. Do not treat one-day sleep score, deep sleep, REM, RHR, HRV, PVT, or grip as a hard diagnosis or a hard scheduling rule.
## Vibe-Living Integration

Use `vibe-living` as the insurance/CRM/life-workbench execution layer, not as the personal goal system. Logseq daily planning decides what matters today; `vibe-living` shows the current business candidates, customer-action blockers, M1 confirmation queue, content素材 pool, and writeback-review state; schedule-planner checks whether the selected action can fit into the day.

When the daily plan relates to insurance, customers, CRM, content素材, or M1 confirmation, run only read/check commands unless the user explicitly approves a reviewed write:

```powershell
python scripts\aione_cli.py check-readiness --json
python scripts\aione_cli.py agent-handoff-summary --json
python scripts\aione_cli.py business-loop-next-steps --json
python scripts\aione_cli.py daily-plan-summary --json
python scripts\aione_cli.py m1-review-queue --json
python scripts\aione_cli.py crm-confirmed-path-audit --json
```

Use `vibe-living` output to choose or refine one daily `#长期目标最小行动`, such as:

- one customer next-step record;
- one M1 manual-confirmation blocker to review;
- one non-private content素材 draft from a real customer issue;
- one CRM usability pain point that directly blocks today's customer action;
- one Logseq writeback-review item to prepare for human review.

Do not let `vibe-living` expand the day into a CRM repair sprint. If a business candidate needs customer identity, stage, household relationship, referral relationship, health detail, policy original text, or next-action confirmation, mark it as `人工确认闸门` and keep it out of AI/CRM execution until the user confirms it.

After drafting, include a short **vibe-living 业务候选动作审核包** outside the journal body when useful:

- `候选动作：` 1-3 business candidates from `vibe-living`;
- `今日选中：` the one action used as the daily minimum closed loop;
- `人工闸门：` what the user must confirm manually;
- `不做：` CRM/system/tool expansions that should not consume today's mainline.

Do not auto-write the package to Logseq, Relaticle, Dify, n8n, Google Calendar, Vikunja, Airtable, or any external system.

## Insurance Capability Growth Integration

Use `D:\used by syncthing\obsidian sync\AI-obsidian\保险经纪前 1% 学习系统.md` as the daily deliberate-practice lens when insurance is the `#长期目标最小行动`. This note is an Obsidian learning-system draft, not a Logseq fact source and not a new tool-development task.

The daily insurance minimum action should usually produce at least one observable practice artifact:

- one customer next-step record;
- one customer clarification question;
- one explanation that a customer can understand;
- one non-private content素材 sentence from a real customer issue;
- one service-sample fragment, such as a risk map, checklist, or one-page explanation;
- one error log about communication, evidence, compliance, product, or tool overuse.

When reviewing an insurance-related day, distinguish:

- `练能力：` real customer action, real feedback, service sample, content素材, or clearer communication;
- `忙工具：` CRM repair, AI workflow tuning, prompt/system building, or data cleanup that did not directly unblock today's customer action;
- `人工闸门：` health details, policy text, household/referral relation, product/nuclear underwriting/compliance judgment, or customer next action requiring user confirmation.

Do not add the full "保险经纪前 1% 学习打卡" template to every journal by default. If useful, compress it into one short review line:

```text
保险能力练习：今日客户动作/输出/反馈/明天只改一个点：__
```

Use AI only for drafts, questions, checklists, and reviews. Do not let the daily plan imply that AI can replace compliance, product, underwriting, medical, or customer judgment.

## Family Care Constraint

Use these current constraints when drafting daily plans or family-related optimizations:

- Treat family issues as **experiments, constraints, and recovery windows**, not as ordinary deviation from the mainline. The current causal chain is: mother takes the child to the health-product shop -> low morning activity and/or snacks -> nap failure or eating difficulty -> spouse sleep loss -> family communication pressure rises -> insurance, exercise, learning, and other long-term mainlines get compressed.
- Workdays usually follow the kindergarten mode: the child goes to kindergarten after 7:00 and is picked up after 16:00. Daytime activity and nap load are mostly absorbed by kindergarten, so this is usually not the main blocker.
- The real blocker is weekends and holidays without kindergarten: low morning activity leads to no midday nap, which drains the user's afternoon energy and creates another evening outing/care burden.
- Do not assume the user's mother can be persuaded to execute a complete child-care schedule. Existing facts indicate weak executive function, weak risk/priority judgment, weak language comprehension/cognitive flexibility, and high distractibility. Reasoning with her is not a reliable intervention.
- Prefer structural substitutes: external arrangements, paid half-day care/activity, fixed high-activity weekend routes, pre-booked activities, limiting the mother's role to one simple step, and preserving only key handoff points for the user or spouse.
- Separate workday kindergarten mode from weekend/holiday no-kindergarten mode. Weekend planning should protect morning physical discharge, midday nap conditions, and the user/spouse's afternoon energy.
- Daily plans should check at most one family minimum action: child routine/activity record, spouse recovery window, morning activity experiment, or low-conflict script. Do not put the whole family problem into a daily plan.
- Available AI outputs include: family execution board, child routine/eating one-pager, low-conflict script for the user's mother, spouse recovery-window plan, and 7-day minimum experiment. Do not automatically write these to Logseq or send family messages.

## Intimate Relationship Integration

Use `D:\used by syncthing\obsidian sync\AI-obsidian\人生规划系统重构\亲密关系经营：哄老婆开心学习系统.md` as the relationship-practice lens when spouse relationship, date/ritual planning, family boundaries, or "哄老婆开心" appears in daily planning. Treat it as Obsidian reference, while Logseq journals remain the factual record.

Daily plans should include at most one relationship minimum action. Prefer low-friction, observable actions:

- say care explicitly, not only through action;
- 10 minutes of no-phone conversation;
- respond to one small bid for connection before reasoning or solving;
- arrange one food/date/ritual detail;
- support spouse's social relationship with one concrete assist;
- repair one conflict with a low-attack opening or repair attempt.

Known positive buttons to preserve:

- explicit verbal care;
- date, eating/drinking together, or going out;
- conventional romance or ritual, such as flowers, red packet, cake, holiday/anniversary arrangement;
- support for her own social relationships, such as receiving friends, yum cha, or helping arrange logistics;
- favorite meals/foods as service-oriented love language.

Known relationship tripwires:

- care done silently but not said;
- watching phone or withdrawing when she wants companionship;
- spouse feeling "I have no place/agency in this home";
- income/future pressure;
- dismissing ritual or consumption comparison as merely "俗套".

If useful, compress the daily relationship check into one line:

```text
亲密关系练习：今天明确关心/无手机聊天/回应连接请求/仪式感/边界修复做了哪一个？反馈如何？
```

Do not turn daily relationship work into a long theory review. The daily goal is one small felt action or one repair attempt.

## Blocking Judgment Rules

Use these rules before labeling a day as procrastination or deviation:

- The current main blockers are usually four stacked constraints: family care/recovery windows, insurance-customer manual confirmation gates, AI/local infrastructure, and planning-granularity overhead.
- If insurance work did not happen, first ask: was the insurance minimum action displaced by a real constraint, and was there a backup time block? Shrink and defer the minimum action before judging the day as failed.
- Customer feedback such as "not buying" or "over budget" is not simple failure. Treat it as a real business signal about budget, willingness, or timing, then convert it into a next-step record and budget segmentation.
- For CRM/AI customer workflows, do not treat the 10-person startup block as merely "tools unfinished." Names, household relationships, referrals, canonical identity, and evidence risks are manual confirmation gates. AI can prepare verification questions and evidence summaries, but must not confirm customer identity or relationships for the user.
- AI/network/local-tool issues are real blockers only when they block today's customer action. If they do, allow at most 45 minutes. If not, move them to the dispatch thread, automation report, or Inbox rather than consuming the daily mainline.
- Planning overhead itself can become a blocker. Daily plans should stay to one long-term minimum action; do not make the plan more detailed just because execution felt hard.

## Current Template Contract

Use the latest `journal模板` unless the user explicitly asks for another version. The current latest version is 6.0:

```markdown
- 🌅 晨间启动
	- #每日一句
	- 🎯 #今日方向  （状态/原则，不写任务）
		- #今日精力灯 ：
- 🌟#每日 #最小闭环 安排在高精力、少中断时间
	- #长期目标最小行动
		- 服务周/月目标：
		- 最小完成定义：
	- #活在当下最小行动 #每日积极休息
	- #每日锻炼
- 🧩#其他事项 安排在碎片、弹性、机动时间
	-
- 🔍 #每日 #复盘与计划
	- #每日 #复盘做得好的 或#值得感恩的事情 ：
	- #每日 #复盘遇到问题 #复盘如何优化 问题 -> 明天优化：
	- #每日 #复盘情绪精力 写感受+分数（满分5分）：
	- #每日 #复盘精力灯 ：早晨判断是否准确；有效信号/疑似噪音：
- 📥收集箱inbox
	-
```markdown
- 🌅 晨间启动
	- #每日一句
	- 🎯 #今日方向  （状态/原则，不写任务）
		-
- 🌟#每日 #最小闭环 安排在高精力、少中断时间
	- #长期目标最小行动
		- 服务周/月目标：
		- 最小完成定义：
	- #活在当下最小行动 #每日积极休息
	- #每日锻炼
- 🧩#其他事项 安排在碎片、弹性、机动时间
	-
- 🔍 #每日 #复盘与计划
	- #每日 #复盘做得好的 或#值得感恩的事情 ：
	- #每日 #复盘遇到问题 #复盘如何优化 问题 -> 明天优化：
	- #每日 #复盘情绪精力 写感受+分数（满分5分）：
- 📥收集箱inbox
	-
```

## Daily Quote Rule

`#每日一句` is not a task, schedule instruction, or daily execution summary. It should be a short sentence in the user's historical style:

- a famous quote or attributed sentence, such as quotes from Wang Xiaobo, Camus, Oscar Wilde, Dong Qing, etc.;
- a self-motivation line;
- a self-examination or self-reminder line;
- a self-improvement principle, learning principle, habit principle, or decision principle;
- optionally connected to the current day, but still written as a principle or reflection rather than a concrete task.

Good patterns:

- `#每日一句 任何值得做的事，做得糟糕也值得做。`
- `#每日一句 比完美重要的是完成。`
- `#每日一句 人的生命格局一大，就不会在琐碎的事情上沉溺。`
- `#每日一句 当中断多发时，可以尽量将任务拆分小型化。`

Avoid:

- `#每日一句 先完成一个保险客户记录。`
- `#每日一句 今天先做谭惠元，再处理 CRM。`
- `#每日一句 节假日/家庭窗口优先保护体力；保险只做一个小闭环。`

Those belong in `#今日方向` or `#长期目标最小行动`, not in `#每日一句`.

## Workflow

First classify the task type:

- **Morning start**: help review today's direction and adjust order/time blocks. Do not rewrite the whole day unless the user asks.
- **In-day calibration**: compare plan vs actual, identify one afternoon priority, and move non-urgent items to Inbox/other事项.
- **Evening review + tomorrow plan**: complete today's review, clear capture sources, check boards/deadlines, then draft tomorrow.
- **Template/skill maintenance**: compare against `journal模板` and `每日复盘、计划、执行流程`; propose or apply edits only outside Logseq unless explicitly approved.

For evening review + tomorrow plan, follow the original flow:

1. Identify the target date, yesterday's journal, current weekly plan, current monthly plan, and any user-provided latest prioritization.
2. Confirm target pages exist through Logseq API when possible. Use `scripts/logseq-get-pages.ps1` for quick page-existence checks.
3. Read today's journal and capture sources that are available to the agent:
   - Logseq journal;
   - current journal `NOW`, `LATER`, `SCHEDULED`, `DEADLINE`, references, and Inbox;
   - user-provided notes from WeChat 2, phone memo, handwritten notes, or calendar when the agent cannot access them directly.
4. Read `[[每日总结计划看板]]` when available to check current-week progress.
5. Read the current weekly plan to extract:
   - weekly must-results;
   - planned day-specific time blocks;
   - maintenance items and hard constraints;
   - paused or non-high-cognition items.
6. Read yesterday/today journals to extract:
   - actual done items;
   - unfinished `#长期目标最小行动`;
   - `服务周/月目标` and `最小完成定义`;
   - problems and tomorrow optimizations;
   - emotion/energy score;
   - inbox items, `NOW`, `LATER`, `SCHEDULED`, and deadlines.
7. Draft today's review first, then draft tomorrow's plan. The review should drive tomorrow's `#今日方向`, one minimum action, and one execution adjustment.
8. Check tomorrow-specific constraints before finalizing:
   - current journal scheduled/deadline items;
   - phone calendar or external calendar only if the user provides the content;
   - schedule-planner workflow status, blockers, conflicts, workout/rest arrangement, and family anchors, if available;
   - vibe-living business candidates, M1 queue, CRM blockers, content素材 candidates, and writeback-review state, when relevant;
   - `保险经纪前 1% 学习系统.md` deliberate-practice lens, when the day touches insurance capability growth;
   - `亲密关系经营：哄老婆开心学习系统.md` relationship-practice lens, when the day touches spouse relationship or family boundary repair;
   - fixed weekly plan time blocks;
   - family/health/customer constraints mentioned in the journals.
9. Draft the daily page or patch suggestion as a separate review artifact under the workspace, not in the Logseq graph.
10. Keep tomorrow's core plan hard-limited:
   - one `#长期目标最小行动`;
   - one `#活在当下最小行动`;
   - one `#每日锻炼` or explicit rest/降级;
   - zero to two actionable fixed constraints or maintenance items in `#其他事项`.
11. Also include, when useful, a short execution note outside the journal body:
   - high-energy block for the minimum action;
   - two 30-minute flexible buffers if the day is unstable;
   - reminder/calendar items that the user may need to set manually.
   - today's negative boundaries, in a separate `今日边界` section, not under `#其他事项`.
12. If schedule-planner was checked, include a concise schedule-planner note in the review artifact:
   - `可用：` what can be scheduled or reused;
   - `阻塞：` unresolved dependencies or conflicts;
   - `建议：` the smallest manual scheduling decision for the user to review.
13. If vibe-living was checked, include a concise business-candidate note in the review artifact:
   - `候选动作：` the strongest business candidates;
   - `今日选中：` the one candidate used for the daily minimum action;
   - `人工闸门：` identity/stage/relationship/evidence confirmations that cannot be automated;
   - `不做：` CRM/tool/system expansions to keep outside today's mainline.

## Writing Rules

- When providing suggested text to paste into Logseq, do not wrap the Logseq body in fenced code blocks. Present the Logseq outline directly as normal Markdown text so the user can review it as the intended body. Use code blocks only for tool commands, examples inside this skill file, or non-Logseq snippets.
- `#今日方向` is a state, principle, or process posture. Do not put concrete tasks there.
- `#每日一句` must follow the Daily Quote Rule: quote/self-motivation/self-examination/self-improvement/self-reminder style, not a concrete task or schedule instruction.
- `#长期目标最小行动` is the concrete task. It must include `服务周/月目标` and `最小完成定义`.
- The long-term minimum action should usually be 15-60 minutes unless the weekly plan explicitly requires a longer high-cognition block.
- Do not reintroduce `#每日 #最重要的三件事` unless the user explicitly asks. Use `#每日 #最小闭环`.
- Keep only minimal prompts in the template; detailed explanations belong in the filling example block, not in daily journals.
- Keep `#每日 #复盘遇到问题 #复盘如何优化 问题 -> 明天优化：` as one line when the user wants problem-to-optimization pairing.
- Do not invent completed work. If no evidence exists, write `未看到明确完成记录` or leave it for user review.
- Do not turn the daily journal into a weekly plan. If an item belongs to week/month/quarter scope, put it in `#其他事项`, a separate note, or a higher-level plan, not the daily minimum action.
- Use `📥收集箱inbox` only for content newly captured during that specific day, such as sudden ideas, links, voice-note snippets, or unprocessed external inputs. Do not put planned low-cognition work, deferred troubleshooting, or "待低认知窗口处理" items in Inbox; put those under `🧩#其他事项` instead.
- Use `🧩#其他事项` only for things the user might actually do today in a fragmented, flexible, or low-cognition window. Do not put pure boundaries there.
- Put negative boundary statements outside the Logseq journal body under an audit-only `今日边界` heading. Boundary statements include wording such as `不做`, `不进入今天主线`, `不新增`, `不扩展`, `不打开`, `不改`, `不整理全部`, `不写入`, `不自动联系`, or `只保留为信息`.
- If a boundary is important enough to appear inside the journal body, convert it into a positive actionable constraint instead. For example, write `GET 录音卡今天最多处理 1 条` under `#其他事项`, and put `不清空收集箱 / 不新增课程大专题` under `今日边界`.
- Preserve the user's existing journal wording when refining. Prefer incremental patch suggestions over rewriting the whole journal.
- For `vibe-living`, use only read/check outputs as planning evidence unless the user explicitly authorizes a reviewed write. Do not auto-confirm customer identity, stage, opportunity type, household relationship, referral relationship, review status, or next action. Do not expose real names, contact details, health details, policy originals, or mapping files in daily drafts.
- For `#每日锻炼`, do not default straight to the offline fallback. First read the target day's workout/rest arrangement from a fresh schedule-planner `workflow auto-dry-run` when available. If schedule-planner is unavailable, stale, has no relevant arrangement, or the arrangement depends on a failed agent/tool path, then use the low-friction offline fallback: 20 minutes at the gym (warm-up 5 minutes + any 2 familiar machines for 2 sets each + stretch 5 minutes), or 10 minutes of walking/stairs/stretching if not going to the gym. If the only blocker is a default evening child-care anchor, distinguish whether the user has explicitly overridden it with badminton, client meeting, date, or no-child-care context before downgrading the workout.
- For child-care issues, do not write advice that depends on the user's mother understanding or executing a full routine. Use structural wording such as "book/choose a fixed high-activity route", "pre-arrange half-day care/activity", "mother only does one simple handoff step", or "user/spouse takes the key transition point."
- If spouse work hours create a rare relationship/family window, treat that as a real constraint. Compress and defer the insurance minimum action rather than labeling the family window as ordinary procrastination.
- For spouse relationship actions, prefer "felt by the other person" evidence: she responded, relaxed, laughed, continued talking, accepted the arrangement, or the conflict de-escalated. Do not count private theory reading alone as relationship practice unless it directly led to an action or repair.
- Use accurate review wording:
  - Replace "没有做保险" with "保险最小动作是否被现实约束挤掉？是否有补位时间？"
  - Replace "工具又折腾了一天" with "这个工具问题是否阻塞当天客户动作？是否超过时间盒？"
  - Replace "家庭问题占用主线" with "家庭底盘是否需要结构替代方案？"
  - Replace "客户不买了" with "得到的预算/意愿/时机信息是什么？下一步记录是什么？"

## Planning Heuristics

- Morning/high-cognition slots go to the weekly P0/P1 mainline.
- AI tools, network repair, Logseq/query/template work, account switching, and system-building go into bounded low-cognition windows unless they directly unblock today's minimum action.
- If today has family/health/relationship constraints, explicitly protect a smaller minimum action rather than pretending the day is normal.
- If yesterday's energy score is below 3.5, sleep/body condition is poor, or `energy_readiness.v1` is yellow/red, shrink the long-term minimum action and downgrade exercise.
- If a task belongs to weekly/monthly/quarterly planning rather than today, put it in `#其他事项`, a separate note, or a higher-level plan, not today's minimum action. Reserve Inbox for same-day capture, not scheduled low-cognition work.
- If a task is explicitly paused, excluded, or protected by a "do not do today" rule, do not list it as a journal task. Keep it in `今日边界` outside the journal body, unless the user explicitly wants the boundary written into Logseq.
- If the day's real flow is already underway, do not over-optimize the plan. Give a small reordering or one next action.
- If today's insurance action does not create a customer action, customer feedback, service sample, content素材, clearer explanation, or error log, treat it as likely tool/admin support rather than capability growth unless it directly unblocks a customer action.
- If the target day is a weekend or holiday without kindergarten, consider adding a low-cognition family protection item: morning high-activity route before lunch, nap-protection routine, or schedule-planner family energy buffer. Do not treat it as a generic parenting knowledge task.
- For schedule-planner integration, only create or propose concrete candidate blocks such as: high-cognition minimum action block, workout/rest block, 1 hour morning outdoor/high-activity route, 20-40 minute spouse recovery window, 20 minute family meeting, 10 minute routine/nap/eating record, or a bounded low-cognition admin/tool block. Do not schedule abstract items like "solve family problem", "improve insurance", or "fix the whole system."
- For local-tool or AI infrastructure work, use the 45-minute rule: if it blocks today's customer action, time-box it; if it does not, move it out of the daily plan.

## Review Standards

- Good/gratitude: record at least one concrete thing that worked or mattered today.
- Problem/optimization: pair each problem with tomorrow's one adjustment when possible.
- Emotion/energy: write feeling plus 1-5 score.
- Energy readiness: if `#今日精力灯` was used, review whether the morning judgment was accurate and which signal was useful/noisy.
- End-of-day review should feed tomorrow's `#今日方向` and one minimum action, not a full new project list.
- Completion review should include task completion and bottleneck analysis, but keep the written journal short unless the user asks for deeper diagnosis.

## Original Daily Flow Checklist

Use this as a hidden checklist. Do not paste it into every journal unless the user asks.

- Morning: Anki daily sentence, scan today's plan, assess emotion/energy, adjust order or time blocks.
- Before focus: use `[[专注前准备惯例]]` if relevant, then start the `#每日 #最小闭环` long-term minimum action.
- Interruptions: record current progress, use flexible time if possible, only swap priority for truly urgent items, put non-urgent thoughts into `[[收集箱（Inbox）]]`.
- Midday optional calibration around 12:30: morning completion percentage, one bottleneck sentence, afternoon's most important item.
- Evening: check capture sources, clean Inbox, review task completion/good/problems/optimization/emotion-energy, check daily board and current-week progress.
- Tomorrow planning: derive one long-term minimum action from weekly direction, check scheduled/deadline/calendar constraints, list secondary tasks, set reminders, and reserve flexible buffers.

## Useful Commands

Quick Logseq API page check:

```powershell
D:\used-by-codex\scripts\logseq-api.cmd run powershell -NoProfile -File <skill>\scripts\logseq-get-pages.ps1 "2026_06_14" "20260607至13复盘与14至20计划"
```

Validate this skill after edits:

```powershell
$env:PYTHONUTF8='1'; python C:\Users\lightcolor\.codex\skills\.system\skill-creator\scripts\quick_validate.py <skill-folder>
```
