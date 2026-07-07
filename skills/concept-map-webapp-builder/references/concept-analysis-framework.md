# Concept Analysis Framework

Use this reference when the concept list is broad, mixed-language, or includes products, protocols, workflows, and implementation mechanisms.

## Focus Question

Before building the model, write one sentence that names the learning job of the map. Good focus questions usually ask what the user needs to understand, compare, decide, or operate.

Examples:

- How do these AI coding concepts relate from user interface to model, protocol, execution, and infrastructure?
- Which concepts are prerequisites, and which are product/interface examples built on top of them?
- What does a beginner need to learn first to understand the whole system without drowning in terms?

Use the focus question to decide which bridge concepts to add, which weak relationships to hide, and which view should be the first screen.

## Normalize Terms

For every term, capture:

- canonical label
- aliases and translations
- category/layer
- plain-language definition
- role in the system
- common examples
- what it is not
- related upstream concepts
- related downstream concepts
- common confusion or near-neighbor concepts
- beginner learning order or prerequisite status
- source or evidence note when needed
- last checked date for time-sensitive claims
- stability level: stable, evolving, product-specific, or uncertain
- uncertainty or freshness risk

## Recommended Layers

Use these layers as defaults, then rename or merge them for the domain:

| Layer | Meaning | Example |
| --- | --- | --- |
| Practice | Human work pattern or methodology | vibe-coding, AI coding |
| Interface | Where users interact | AI IDE, CLI, chatbot, desktop app |
| Model | Reasoning/inference engine and context | LLM, VLM, multimodal model, token, context |
| Agent | Goal-directed actor and coordination | agent, agent team, swarm, skill, harness |
| Protocol | Tool/client interoperability | Function Calling, MCP, ACP, API |
| Knowledge | Retrieval and memory substrate | RAG, vector database, memory |
| Execution | Actions in software systems | code scripts, workflow, RPA, headless browser |
| Infrastructure | Runtime and hosting | cloud provider, model API platform |

## Edge Types

Prefer precise verbs:

- `uses`: one concept directly uses another
- `wraps`: a product/interface wraps a lower-level mechanism
- `runs_on`: runtime or hosting dependency
- `exposes`: makes a capability available
- `retrieves_from`: lookup/retrieval relation
- `feeds_context_to`: context injection relation
- `orchestrates`: sequencing/control relation
- `automates`: replaces repeated manual operation
- `extends`: broader/narrower capability relation
- `bridges`: interoperability relation
- `observes`: reads state or captures feedback
- `executes`: performs action

Avoid `related_to` except as a temporary placeholder during analysis.

## Relationship Propositions

For important edges, write the relationship as a readable proposition, not just a short label. A good proposition can be read as a sentence:

```text
RAG retrieves_from Vector Database because retrieved chunks are injected into the model context.
MCP bridges Agentic Coding Tool and external tools because it standardizes how tools/resources/prompts are exposed to the model host.
AI IDE wraps Agentic Coding Tool because it gives the agent editor context, file access, and user-facing controls.
```

For product- or protocol-dependent propositions, add confidence and evidence metadata:

- confidence: high, medium, low
- evidence: primary docs, source inspection, observed behavior, or inference
- freshness: last checked date and whether the fact may drift

## Recommended Views

Use more than one view when a single global graph would flatten the user's understanding:

| View | Purpose |
| --- | --- |
| Global graph | See the whole conceptual ecosystem |
| Beginner path | Learn prerequisites in a reasonable order |
| Technology stack | Show layers from UI to model, protocol, execution, and infrastructure |
| Protocol/interface view | Compare API, Function Calling, MCP, ACP, and tool bridges |
| Scenario view | Explain how concepts combine in a real workflow |
| Simplified view | Hide weak edges and advanced nodes for first-pass understanding |

## Anti-Hairball Controls

For dense maps, add one or more of these controls:

- filter by relation type
- filter by layer or category
- show upstream/downstream only
- show 1-hop, 2-hop, or 3-hop neighbors
- collapse or expand groups
- hide weak or low-confidence edges
- simplified beginner mode
- search with highlighted path to matched nodes

## Graph Analysis Layer

React Flow can remain the renderer and interaction layer. Add Graphology or a similar graph-data layer when the app needs:

- neighbor lookup beyond direct React state filtering
- shortest path or dependency path display
- central node or bottleneck detection
- community/group detection
- isolated-node and dangling-edge checks
- graph metrics that inform layout or simplification

## Visual Encoding Rules

Use visual encoding to carry meaning, not decoration. Each visual channel should have one primary job:

| Visual channel | Primary meaning |
| --- | --- |
| Shape | Node type |
| Color | Conceptual layer, or state if the map is operational |
| Stroke/badge/icon | Status, certainty, freshness, or importance |
| Edge style | Relationship type, strength, or confidence |
| Handle position | Relation port and connection semantics |
| Spatial position | Direction, dependency, abstraction level, or learning order |

### Shape Vocabulary

Keep the shape set small and stable:

| Shape | Use for |
| --- | --- |
| Rounded rectangle | Ordinary concept, method, capability |
| Pill / capsule | Product, tool, UI surface, entry point |
| Hexagon | Protocol, API, interface, standard |
| Circle | Model, agent, execution unit, actor |
| Cylinder-like card | Data store, knowledge base, vector database, memory |
| Diamond | Decision, routing, branching, condition |

Do not use shape for importance. Use size, position, stroke, badge, or central placement for importance.

### Color Rules

- Prefer color for conceptual layer in educational maps.
- Prefer color for operational status only in control-console maps.
- Keep palette low-saturation and readable on light/dark backgrounds.
- Do not rely on color alone; pair color with labels, icons, badges, shape, or edge style.
- Keep selected/highlight/error/stale colors reserved so category colors do not compete with interaction feedback.

### Handle And Port Rules

Use multiple named handles when a node has multiple relation roles. Two generic handles are not enough for dense concept maps.

Recommended semantic ports:

| Port | Position | Use for |
| --- | --- | --- |
| `input` | left | upstream dependency, prerequisite, input |
| `output` | right | downstream dependency, call, exposed capability |
| `abstract` | top | parent concept, governance, goal, abstraction |
| `implementation` | bottom | implementation, execution, concrete tool |
| `context-in` | left/top side | context, prompt, memory feed |
| `evidence-in` | left side | source, citation, observation |
| `memory-in` | left/bottom side | long-term memory, vector store, retrieval substrate |
| `tool-out` | right/bottom side | tool call, script, browser, RPA, workflow |
| `api-out` | right side | API, protocol, function call |
| `human-control-in` | top/left side | user intent, approval, steering |

Edges should connect to the port that matches their meaning. If handles are hidden, use `visibility: hidden` or opacity rather than removing them when the graph library needs dimensions for routing.

### Edge Style Rules

| Edge style | Meaning |
| --- | --- |
| Solid | stable core relationship |
| Dashed | optional, inferred, or indirect relationship |
| Dotted | evidence, context, citation, or reference flow |
| Thick | strong, frequent, or primary-path dependency |
| Thin/light | weak, secondary, or low-confidence relation |
| Arrow | direction matters |
| Double arrow | bidirectional relation, sync, or mutual influence; use sparingly |

Edge labels should be verbs or short verb phrases that can become readable propositions.

### Spatial Position Rules

- Left-to-right usually means user intent/interface -> model/agent/protocol -> execution/output.
- Top-to-bottom usually means abstract/general -> concrete/implementation.
- Knowledge, memory, evidence, and context can sit as side-feed regions instead of interrupting the main chain.
- Infrastructure belongs near the bottom or right edge unless it is the focus question's main subject.
- Strong learning paths should be visually central; secondary links should sit around the perimeter or be hideable.
- Use force layout only as a helper for exploration or rough spacing. Educational maps need semantic placement first.

## Layout Heuristics

- Put human intent and practice concepts near the top or left.
- Put interfaces before agents, because interfaces host or expose agents.
- Put models and context near the agent layer, because they power decision-making.
- Put protocols between agents and tools.
- Put execution tools below protocols.
- Put knowledge systems close to context and memory.
- Put infrastructure at the bottom or right edge.
- Treat frequently used entry points as front doors: place them before or above the systems they open, call, or observe.
- Preserve semantic direction for critical edges. For example, `front door -> target`, `API -> app`, `registry -> tool`, and `handoff -> owner` should not be visually reversed.
- Use side-feed placement for sync, import, evidence, and context flows when vertical stacking makes the meaning confusing.
- Reserve enough space for the rendered card height, not just the node anchor position. Avoid tight same-column stacking unless the cards have a large vertical gap.
- Keep edges visually under nodes and keep labels readable. If an edge appears to pass through a card, first try semantic repositioning before treating it as a rendering bug.
- Group by meaning, not only by graph math: source/intake, processing, execution, knowledge, and review/status layers should have distinct regions.
- Persist user-adjusted positions when the graph is meant to become a long-lived control surface. Reset should be an explicit user action.
- Version saved layout keys whenever default coordinates, view partitioning, or semantic layout rules change.
- In focus mode, highlight direct neighbors while keeping the wider map readable enough for orientation.
- Use top-layer portals for hover cards and popovers; do not rely on node-local z-index for overlays.
- If nodes represent runnable local tools or artifacts, model their entries as whitelisted IDs with explicit types: url, file, directory, app, or python_ui.
- Let the focus question decide the primary view and first-screen emphasis.
- Do not force all edges into the same visual strength; weak, inferred, or low-confidence edges should be visually lighter or hideable.
- Use multiple views when the same concept set needs both overview and learning-path comprehension.
- Keep shape, color, edge style, handle placement, and spatial position consistent with the visual encoding rules.
- Use semantic handles/ports for dense maps so edge routing communicates meaning and reduces edge crossings.

## Quality Checklist

Before implementation is complete, verify:

- A focus question is present and the map structure visibly answers it.
- Every user-supplied concept appears in the graph or is explicitly folded into an alias.
- Every added bridge concept has a reason.
- Important relationships have directional labels and readable propositions.
- Visual encoding is documented: shape, color, edge style, handle/port meaning, and spatial direction each have a stable semantic role.
- Nodes use a limited shape vocabulary and do not rely on color alone for meaning.
- Dense nodes use multiple named handles/ports when different relation types would otherwise collide.
- Edge styles encode relationship type, strength, certainty, or evidence flow consistently.
- Critical directional relationships match their spatial direction, or the deviation is explicitly justified.
- Time-sensitive products, protocols, providers, APIs, or model capabilities include evidence/freshness notes or are clearly marked uncertain.
- No nodes overlap in every maintained view.
- Dense areas still have enough room for edge labels, handles, tooltips, and status badges.
- Dense graphs include anti-hairball controls such as filters, hop depth, collapsible groups, or simplified mode.
- Multi-view maps preserve the user's orientation when switching views.
- The graph is interactive: drag, pan, zoom, select.
- Dragged node positions persist across reloads.
- Reset layout is available as an explicit control when persistence is enabled.
- Focus mode does not make the rest of the map unreadable or hide relationship context needed for understanding.
- Layout persistence uses a current versioned key, and old saved positions cannot silently override a redesigned default layout.
- Local opening, if present, is mediated by a whitelist gateway and cannot accept arbitrary frontend-supplied paths or commands.
- The app includes concept explanations, examples, related nodes, common confusions, upstream dependencies, downstream dependents, and beginner next steps when useful.
- Tooltips, popovers, or detail panels render above graph elements, preferably through a portal/top-layer container.
- Build and local load were checked.
- Layout and semantic-edge checks were run when the project includes automated checks.
- Any stale or uncertain facts are marked or verified from primary/current sources.
- A short iteration note records what should be improved in the reusable skill after this real use.



