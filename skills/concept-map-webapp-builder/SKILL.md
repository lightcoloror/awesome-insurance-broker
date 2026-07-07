---
name: concept-map-webapp-builder
description: Analyze concepts, processes, workflows, code knowledge, tool ecosystems, evidence maps, and system relationships; clarify nodes and edges; and deliver an interactive relationship-map artifact. Use when the user provides many terms, workflows, code modules, tools, evidence items, or process steps; asks to understand a conceptual or operational ecosystem; requests a visual relationship graph; wants draggable/zoomable nodes; or wants a learning, system, workflow, code-knowledge, tool-radar, or evidence map delivered as a local web UI, static HTML, structured graph data, or analysis artifact.
---

# Relationship Map Workbench Builder

## Overview

Use this skill to turn messy concepts, workflows, code knowledge, tool ecosystems, evidence chains, or operational systems into a structured relationship map and, when requested, an interactive local workbench. The core deliverable is the relationship model: typed nodes, typed edges, evidence, layout semantics, and human-readable explanations. A webapp is the common rich output, usually React + Tailwind + React Flow unless the existing project dictates another stack; for smaller requests, a structured Markdown/JSON analysis or static HTML graph may be enough. For long-lived maps or local control consoles, include persistent layouts, focus mode, top-layer overlays, bilingual labels when appropriate, and optional whitelist-backed local entry opening.


## Scope Of Map Objects

This skill is not limited to abstract concepts. Treat "concept map" as shorthand for an interactive relationship map whose nodes and edges may represent:

- Concepts, theories, terms, protocols, frameworks, providers, and product categories.
- Processes, workflows, decision routes, handoff paths, review loops, and operational SOPs.
- Code knowledge such as repositories, packages, modules, files, symbols, APIs, call paths, dependencies, ownership, evidence snippets, and source-review status.
- Tool ecosystems, open-source candidates, local tools, MCP servers, plugins, registries, runtime boundaries, and integration risks.
- Knowledge artifacts such as wiki pages, notes, generated summaries, diagrams, evidence documents, proposals, changelogs, and human review records.

Choose the modeling lens from the user's goal. A learning map explains meaning and order; a process map explains sequence, gates, roles, and feedback; a code-knowledge map explains source evidence, architecture, dependencies, and impact; a tool radar explains positioning, verification status, side effects, and next actions.


## Skill Design Principles

This skill should remain a compact, reusable procedure rather than a dump of every graph-design idea. Keep the core `SKILL.md` focused on the decisions an agent must make every time:

- Trigger on the user intent to clarify relationships, flows, dependencies, evidence, architecture, or tool positioning, not only on the words "concept map" or "React Flow".
- Keep implementation guidance as defaults with escape hatches. React Flow is the default for editable small/medium local workbenches, not a universal requirement.
- Use progressive disclosure for deep details. Put long tool comparisons, renderer-specific recipes, visual examples, schema examples, and export templates in `references/` or `assets/`, then tell the agent when to load them.
- Prefer reusable procedures over instance-specific conclusions. The skill should teach how to build a relationship map for a class of problems, not hard-code one user's current graph.
- Include gotchas that agents repeatedly get wrong: confusing page UI layout with graph node layout, center-to-center edges, generic "related to" edges, unverified AI-generated claims, and overwriting human layout without reset.
- Validate the artifact, not just the build. A graph app can compile while still failing because nodes overlap, edges pierce cards, ports contradict semantics, or evidence status is invisible.
## Core Contract

- Use when the user gives many concepts, tools, protocols, workflows, code modules, repositories, files, symbols, evidence artifacts, process steps, frameworks, or jargon terms and wants their meaning, sequence, dependencies, evidence, ownership, or relationships made clear.
- Done means the deliverable explains the modeled objects, shows their relationships clearly, preserves evidence and uncertainty, and matches the requested medium. For interactive apps, it should support drag/zoom/pan and run locally with a verified build or browser check.
- Start from a focus question whenever the user gives a broad or mixed object set. The map should answer a learning, workflow, architecture, evidence, or decision question, not become a flat encyclopedia or file listing.
- Do not invent authority. Mark uncertain or time-sensitive claims, and browse or inspect primary sources when current accuracy matters.

## Workflow

1. Normalize the map input.
   - Write a one-sentence focus question before modeling, such as: "What should this map help the user understand or decide?"
   - Preserve user-provided terms, process names, code names, file/module/symbol names, aliases, Chinese/English names, and examples.
   - Add missing bridge concepts only when they help explain relationships.
   - Separate stable concepts and source facts from product names, generated summaries, current-market examples, and unverified tool claims.

2. Build the relationship model.
   - Group nodes into layers such as concept, process step, interface, model, agent, protocol, code module, source evidence, knowledge artifact, execution, review, and infrastructure.
   - For each node, define what is appropriate for its type: plain-language meaning, role, inputs, outputs, sequence position, source evidence, code location, examples, boundary, related nodes, common confusion, ownership, and beginner learning order when useful.
   - For product, protocol, provider, model, or fast-moving concepts, include source/freshness metadata when available: source, last checked date, stability, and whether the claim may become stale.
   - For each relationship, define a typed edge: "uses", "runs on", "exposes", "retrieves from", "orchestrates", "wraps", "extends", "replaces", "feeds context to", or another precise verb.
   - Turn important edges into readable propositions. A key edge should be understandable as a sentence, for example: "RAG retrieves from Vector Database because retrieved chunks are injected into model context."
   - Add relationship confidence or evidence notes when the relation depends on a current product behavior, external protocol, or contested interpretation.
   - Plan semantic layout direction before implementing: upstream/front-door/input concepts should sit before or above downstream targets; dependency and evidence flows should read in a stable direction.
   - Identify critical edges whose spatial direction must be preserved, such as front-door -> system, source -> knowledge base, registry -> tool, and handoff -> owner lookup.
   - Decide which views the map needs before building: global graph, beginner path, workflow path, code architecture, source-evidence view, technology stack, protocol/interface layer, application scenario, tool radar, or simplified view.

3. Choose the delivery path.
   - If the user asked for an app or the map needs inspection/editing, build or extend an interactive local UI.
   - If an existing suitable project is present, extend it. If no project exists and a web UI is appropriate, copy `assets/frontend-template/` into the target output directory and adapt the graph data.
   - Prefer an existing graph/canvas library for graph interaction instead of hand-rolling drag/zoom behavior. Choose by job: React Flow for editable small/medium workbenches; ELK/Dagre for structured automatic layout; Cytoscape.js for graph analysis + visualization in one browser library; G6/Graphin for highly customized graph products and richer built-in interactions/layouts; Sigma.js + Graphology for larger network exploration; Mermaid for text-first docs; JSON Canvas/Obsidian Canvas for durable personal-knowledge canvases; static SVG/HTML when publication matters more than editing.
   - Use React Flow for small and medium editable maps; add Graphology/Dagre/ELK for graph analysis or initial layout when needed; use G6/Graphin, Cytoscape.js, or Sigma.js when the graph scale, network analysis, or rendering requirements justify it.
   - When the map needs graph reasoning, separate the graph data/analysis layer from the renderer unless the chosen library intentionally combines both. Graphology can provide neighbors, paths, central nodes, communities, parallel-edge checks, and isolated-node checks while React Flow, Sigma.js, or another renderer handles interaction; Cytoscape.js can also serve as both renderer and analysis library for network-style maps.
   - When the map is a control surface for local tools, files, desktop apps, or Python UIs, use a local whitelist gateway. The frontend should send stable node/entry IDs, never arbitrary paths or commands.

4. Build the artifact or app.
   - For interactive outputs, include a full relationship graph with draggable nodes and zoom/pan controls.
   - Include node details appropriate to the object type: meaning, role, inputs, outputs, examples, keywords, source/evidence, code location, caveats, common confusion, upstream dependencies, downstream dependents, owner, status, and suggested order when useful.
   - Include a selected-node explanation panel when the output is interactive. Adapt it to the map goal: learning maps explain meaning and prerequisites; workflow maps explain stage, gate, input/output, and failure modes; code-knowledge maps explain source location, dependencies, call paths, owners, and evidence; tool radars explain verification status, side effects, fit, and next action.
   - Define a visual encoding plan before styling: shape encodes node type, color encodes layer or state, edge style encodes relationship type/strength/certainty, handle position encodes relation port, and spatial position encodes semantic direction or learning order.
   - Use a limited shape vocabulary. Example defaults: rounded rectangle for ordinary entities, pill for tools/interfaces/products, hexagon for protocols/interfaces/standards, circle for models/agents/execution units, cylinder-like card for data/knowledge stores, diamond for decisions or routing points, and document/file shapes only when code or evidence artifacts are first-class nodes.
   - Keep colors low-saturation and consistent. Prefer color for conceptual layer; use stroke, badge, icon, opacity, or edge style for status, certainty, freshness, and importance. Do not rely on color alone.
   - Use multiple named handles when a node has different relation ports. Do not force dense maps through only one source and one target handle. Common ports include context-in, memory-in, evidence-in, human-control-in, tool-out, api-out, workflow-out, and execution-out.
   - Route edges from semantically correct ports: inputs/dependencies on the left, outputs/downstream calls on the right, abstract/governance links on top, implementation/execution links on bottom, and evidence/context side-feeds on small side handles when useful.
   - Route edge endpoints to node boundary anchors or semantic handles, never to the visual center of a node card. For simple SVG/static renderers, compute left/right/top/bottom anchor points from node size and relative node direction so edges attach to borders instead of crossing card content.
   - Use edge visual style deliberately: solid for core stable relations, dashed for optional or inferred relations, dotted for evidence/context/reference flows, thicker lines for strong/high-frequency dependencies, lighter lines for weak or low-confidence edges, and arrows only where direction matters.
   - Use semantic layout before force layout for maintained maps. Left-to-right should usually mean input/source/interface to processing/review/output; top-to-bottom should usually mean hierarchy, governance, or abstract-to-concrete; side placement should hold evidence, context, memory, exceptions, or auxiliary systems.
   - Include filters/search by layer, keyword, and relationship category when useful.
   - For dense maps, add anti-hairball controls: relation-type filters, upstream/downstream view, 1-hop/2-hop/3-hop neighbor depth, collapsible groups, weak-edge hiding, or simplified mode.
   - Add multiple views when the object set has more than one natural reading path, such as learning path, workflow path, code architecture, source evidence, technology stack, protocol/interface, scenario, global graph, or simplified view.
   - Use Chinese-first UI copy when the user works in Chinese; keep technical proper nouns bilingual instead of leaving generic UI in English.
   - Render hover cards, tooltips, menus, and popovers through a top-level portal or equivalent overlay layer so graph nodes and edges cannot cover them.
   - Prefer bezier or other visually separated edge types for dense relationship maps; avoid edge labels crossing node cards.
   - Add layout persistence when the graph is more than a small static demo: user-dragged node positions should survive refresh, and only an explicit reset action should restore defaults.
   - Version the localStorage key when default coordinates or layout semantics change, so stale saved positions do not override improved layouts.
   - Add node separation / collision avoidance for generated and dragged layouts so cards do not overlap when labels wrap or nodes are moved.
   - In focus mode, highlight the selected node and direct neighbors, dim unrelated nodes, and provide a visible clear-focus action. Keep the wider relationship graph readable unless the user explicitly filters it away.
   - Keep edge labels readable and use domain-appropriate labels; when the user works bilingually, prefer bilingual labels for technical terms.
   - Keep tooltips and detail panels above graph elements, and avoid placing graph edges visually over node content.
   - Keep the first screen as the actual tool, not a landing page.
   - If local opening is enabled, keep all allowed entries in `gateway_config.json` and expose health/entry/open endpoints through `gateway.py` or an equivalent gateway.

5. Verify.
   - Run the checks appropriate to the deliverable: schema validation for data artifacts, Markdown/link checks for docs, build checks for web projects, and browser checks for interactive UIs.
   - Start the local dev server or preview server when an app is part of the deliverable and it is feasible.
   - For app outputs, confirm at least one HTTP/browser load, and check that graph nodes render and interactions are not inert.
   - Confirm the focus question is visible in the analysis artifact, data, or app copy, and that the graph answers it instead of merely listing objects.
   - Hover at least one node and verify top-layer overlays are not clipped or hidden behind graph elements.
   - Check default layouts for overlapping nodes in every view.
   - Check that edge endpoints attach to node borders/handles rather than node centers, especially in custom SVG renderers or generated static graph pages.
   - Check important directional relationships against semantic layout rules, not only against graph connectivity.
   - Check that important edge labels read as meaningful propositions, not vague "related to" links.
   - Check dense-map controls or simplified views when the map has enough nodes/edges to become visually tangled.
   - Confirm selected-node focus does not make the rest of the map unreadable or break the perceived relationship network.
   - If a gateway is included, compile it and check `/api/health` plus one whitelisted entry endpoint.
   - Report exact URL, command, build status, and any verification limits.

6. Capture the iteration loop when this skill is used on a real project.
   - Record what domain or object set was modeled.
   - Record which relationships, terms, or views were unclear during use.
   - Record what user interaction exposed: dragging problems, missing filters, confusing edges, weak explanations, or stale facts.
   - Convert the lesson into a future skill update instead of leaving it only in chat.

## Tool Radar / Evidence Map Rules

Use these rules when the relationship map is also an open-source tool radar, code-graph-tool evaluation map, source-review map, or evidence-backed decision map.

- Check local source ledgers or registries before treating an external repository or tool as new. If the user's environment has a `SOURCE_INVENTORY`, `source-ledger`, or tool registry, use it as the first trust boundary before recommending clone, install, setup, daemon, or MCP wiring.
- Distinguish source status visually and in data. Recommended statuses include `source_reviewed`, `source_cloned`, `needs_evidence_link`, `linked`, `integrated_local_tool`, `public_only`, `clone_blocked`, and `not_integrated_candidate`.
- Separate tool positioning from verification. A node can be promising, popular, or visually useful without being source-reviewed or safe to run. Do not collapse "interesting candidate" into "recommended integration".
- Model evidence as first-class graph data. For each tool/repo node, preserve repo URL, local path when available, commit, review date, evidence document, review boundary, and next action.
- When outputs are generated by AI tools, label them as generated summaries, diagram proposals, or evidence proposals until checked against source. Do not render generated architecture/wikis as final verified facts.
- For risk-bearing tools, represent side effects as explicit nodes or badges: global config writes, MCP setup, IDE/agent config changes, hooks, daemon/watchers, telemetry, external model calls, credential handling, persistent caches, and local-path access.
- Keep evaluation categories layered. Separate code graph engines, symbol navigation, documentation/RAG generators, visual editors, graph database backends, planning/handoff artifacts, and Observable-brain workbench layers instead of forcing them into a single replacement ranking.
- In the UI, expose review boundaries and remaining verification work. A user should be able to see whether a claim came from source review, public README only, local runtime proof, build/test verification, or an unverified community recommendation.

## System Map / Operational Graph Layout Rules

Use these stricter rules when the map is a system map, code graph, tool map, workflow map, control console, or observable-brain style operational graph. These maps are not just educational concept maps: they must show main flow, dependency, review, observation, archive, feedback, and human-control boundaries clearly enough that a user can inspect and correct the system.

- Choose layout direction from the dominant semantics. Use LEFT-to-RIGHT / `RIGHT` direction for data flow, task flow, routing, dependency flow, source -> processing -> review -> output/archive pipelines, and most System map views. Use TOP-to-BOTTOM only for hierarchy, authority, governance, or abstract-to-concrete layer views. Use force/radial layouts only for temporary exploration, centrality, communities, or anomaly discovery, not as the default remembered layout.
- Prefer a mature layout engine for non-trivial system maps. Use React Flow for interaction and ELK layered for structured default layout when the graph has enough nodes/edges that hand placement or hand-written repel logic would become brittle. Do not keep expanding custom `repelOverlappingNodes`-style code as the main layout strategy.
- Keep coordinates/layout separate from factual graph data when possible. Store graph facts in one data file, layout positions and pinned state in a layout file or layout section, and human decisions in changelog/proposal records when the app supports review.
- For ELK layered layouts, use real rendered node dimensions when available. Recommended defaults: `algorithm=layered`, `direction=RIGHT`, `edgeRouting=ORTHOGONAL`, `portConstraints=FIXED_SIDE`, node placement similar to `NETWORK_SIMPLEX`, crossing minimization similar to `LAYER_SWEEP`, with generous node-node and layer spacing.
- Treat node overlap and edge clutter as separate problems. After automatic layout, run a bounding-box overlap validator using real width/height and padding. If overlap count is greater than zero, increase node/layer spacing and retry before accepting the layout.
- Use semantic multi-port / multi-handle nodes. A system map should not force every relationship through one input and one output. Recommended side semantics: left = input/dependency/evidence in; right = output/feeds/routes/plans out; top = control/review/guard; bottom = archive/observe/feedback.
- Keep React Flow handle IDs, edge `sourceHandle`/`targetHandle`, and ELK ports on the same semantic port model. Do not let renderer handles, data edge types, and layout engine ports drift into three incompatible systems.
- For System map edge types, use a stable mapping unless the project has a better domain-specific one: `feeds` source-output -> target-input; `routes` source-route -> target-input; `plans` source-plan -> target-input; `depends` source-output -> target-dependency; `guards` source-control -> target-control; `reviews` source-control -> target-control; `observes` source-feedback -> target-feedback; `archives` source-feedback -> target-feedback.
- Avoid completely overlapping relationship lines. For multiple edges between the same node pair, assign lanes and offsets. Prefer orthogonal lane routing with different source/target port slots over free curves. Curves may be used for a few emphasis edges, but large system maps should stay structurally legible.
- Do not solve last-segment overlap by switching every edge to loose bezier curves. For right-angle routing, use multi-port placement plus lane offsets so parallel edges leave and enter at distinct slots and labels do not all land on the same midpoint.
- Preserve human spatial judgment. If users can drag nodes, provide save/reset/restore controls. For long-lived maps, support pinned or locked nodes so automatic layout does not move core nodes or human-confirmed placements without an explicit reset.
- Layout changes should be reversible. Auto layout may directly apply the first default layout when the user wants that behavior, but there must be a way to restore built-in defaults or reset saved positions when persistence is enabled.
- Exported images or static graph renderers must use the same semantic ports and lane rules as the interactive canvas. Do not let PNG/export output fall back to center-to-center or stale routing.
- Add or run diagnostics for operational maps: node overlap count, parallel edge count, major semantic direction violations, and visible edge/label occlusion risks. Passing build is not enough when the graph itself is the product.
- Acceptance checks for System maps: no node overlap in maintained views; main flow reads in the chosen direction; control/review/feedback/archive edges do not visually merge with the main flow; parallel edges between the same nodes do not fully overlap; labels do not cover node titles/status; drag-save-refresh works; reset/restore works; exported graph matches canvas semantics.
- Anti-patterns: center-to-center card edges; one generic source/target handle for dense maps; hand-written collision fixes as the only layout engine; straight orthogonal edges with no lanes; all-free-curve routing in dense operational maps; automatic layout silently overwriting user layout; confusing page UI layout with graph node layout.


## Required Output Shape

For a full implementation, produce:

- A local interactive artifact when requested, usually a web project or an update to an existing app.
- A graph data model in code or structured data, covering the relevant object types such as concepts, process steps, code entities, tools, evidence, or artifacts.
- For app outputs, a graph view with interactive drag, zoom, pan, selection, and details.
- A focus question that explains what the map is designed to clarify.
- A visual encoding plan covering node shapes, color semantics, edge styles, handle/port meanings, and spatial rules.
- A readable default layout with no obvious node overlaps.
- Key relationships expressed as readable propositions with precise verbs.
- Evidence/freshness notes for time-sensitive products, protocols, providers, models, or APIs when relevant.
- Persistent layout behavior when users can drag nodes.
- A selected-node explanation panel tailored to the map goal when the output is interactive.
- Multiple views or anti-hairball controls when the object set is dense.
- Top-layer overlay behavior for hover/detail UI when overlays are present.
- Verification scripts or explicit checks for build, layout overlap, and any important semantic edge layout rules.
- Optional whitelist gateway files when the map opens local URLs, files, directories, desktop apps, or Python UIs.
- A short iteration note when the work should improve the reusable skill.
- A short final note with artifact path, launch command or opening instructions when applicable, local URL when applicable, and validation results.

For analysis-only requests, produce:

- A focus question.
- A node table appropriate to the map object type, such as concepts, process steps, code entities, tools, evidence, or artifacts.
- A relationship edge list with key propositions and evidence/freshness notes where needed.
- A recommended visualization layout.
- A visual encoding recommendation for shape, color, edge style, handles/ports, and position.
- Recommended views and anti-hairball controls.
- A proposed artifact/app structure, without writing files unless the user asks.

## Renderer And Artifact Selection

- Use React Flow / xyflow when the user needs an editable local relationship workbench with custom node cards, details panels, drag-save-refresh, semantic handles, proposal/review UI, or local gateway controls.
- Use ELK layered when a maintained system/workflow/code map needs structured automatic layout, ports, hierarchy, or edge routing. Use Dagre only for simpler directed trees/flows where sub-flow and edge-routing limits are acceptable.
- Use Cytoscape.js when the graph is a network-analysis object as much as a UI object: filtering, selectors, graph algorithms, layouts, JSON serialization, and browser visualization matter more than rich card-based editing.
- Use G6/Graphin when the target is a more customized graph product with many built-in layouts, interactions, plugins, themes, or 3D/performance-oriented needs.
- Use Sigma.js with Graphology when the graph is larger and the primary task is network exploration/rendering rather than detailed card editing. Keep Graphology as the data/algorithm layer.
- Use Mermaid when the output should live in Markdown/docs, be diff-friendly, and remain text-first; do not use it as the default for dense editable workbenches.
- Use JSON Canvas / Obsidian Canvas when the user wants durable personal-knowledge canvases that humans can keep editing in a knowledge base.
- Use static HTML/SVG only for lightweight publication or review artifacts; still apply border anchors, semantic layout, and evidence labeling.

## Resources

- Read `references/concept-analysis-framework.md` when conceptual meaning, taxonomy, or learning order is ambiguous. For workflow, code, evidence, or tool-radar maps, use the same discipline but adapt node/edge definitions to the object type instead of forcing a concept taxonomy.
- Use `assets/frontend-template/` when creating a new React/Tailwind graph app from scratch and that stack fits the request. The template includes React Flow, persistent layout, focus mode, portal tooltip, layout checks, semantic-edge checks, and an optional whitelist gateway.

## Red Lines

- Do not present a decorative diagram as the deliverable when the user asked for an inspectable model, editable graph, or interactive webapp.
- Do not skip the focus question for broad or mixed object sets; without it, the graph can become an unfocused glossary, file listing, or tool catalog.
- Do not collapse all relationships into generic "related to" edges.
- Do not leave important edges as cryptic labels when they should be readable propositions.
- Do not use shape, color, edge style, handle placement, or position inconsistently; each visual channel should carry a stable meaning.
- Do not rely on color alone to convey category, state, certainty, or risk.
- Do not force dense maps through two generic handles when semantic ports would reduce crossings and clarify relation types.
- Do not omit freshness/evidence warnings for time-sensitive products, protocols, APIs, model capabilities, or cloud providers.
- Do not force every concept, workflow, code-knowledge, evidence, or tool set into a single global graph when multiple views or simplified views are needed for understanding.
- Do not draw graph edges from node center to node center when nodes are cards; edges should connect to border anchors or explicit handles so they do not visually pierce node content.
- Do not hide large parts of the relationship network in focus mode unless the user explicitly asks for a filtered view.
- Do not let a dense graph become a hairball when filtering, hop-depth, grouping, or weak-edge controls would preserve readability.
- Do not treat "no overlap" as sufficient when the spatial direction contradicts the relationship meaning.
- Do not rely on CDN React/Tailwind for a local deliverable unless the user explicitly wants a quick static prototype.
- Do not put hover/detail overlays inside graph nodes when that can be covered by node or edge stacking; use a portal/top-layer overlay.
- Do not let the frontend open arbitrary local paths or commands. Use a whitelist gateway for non-Web or local control actions.
- Do not start or change local ports without checking local port rules when applicable.
- Do not overwrite an existing project or generated artifact without preserving or clearly separating the previous version.












