import {
  Background,
  Controls,
  Edge,
  Handle,
  MarkerType,
  MiniMap,
  Node,
  NodeProps,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import clsx from 'clsx';
import { Network, RotateCcw, Search, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

type ConceptData = {
  title: string;
  layer: string;
  summary: string;
  examples: string[];
  active?: boolean;
  dimmed?: boolean;
  connected?: boolean;
};

type ConceptNode = Node<ConceptData, 'concept'>;

type NodePosition = {
  x: number;
  y: number;
};

type SavedPositions = Record<string, NodePosition>;

const positionStorageKey = 'concept-map-webapp-builder:v2:node-positions';
const nodeBox = { width: 280, height: 190, gap: 72 };

const layerColors: Record<string, string> = {
  practice: '#f97316',
  interface: '#10b981',
  model: '#3b82f6',
  agent: '#a855f7',
  protocol: '#06b6d4',
  knowledge: '#65a30d',
  execution: '#d97706',
  infra: '#64748b',
};

const initialNodes: ConceptNode[] = [
  {
    id: 'human-intent',
    type: 'concept',
    position: { x: 0, y: 0 },
    zIndex: 2,
    data: {
      title: 'Human Intent / 人类意图',
      layer: 'practice',
      summary: 'Replace this seed data with the user concept model.',
      examples: ['Goal / 目标', 'Constraint / 约束', 'Feedback / 反馈'],
    },
  },
  {
    id: 'agent',
    type: 'concept',
    position: { x: 420, y: 180 },
    zIndex: 2,
    data: {
      title: 'Agent / 智能体',
      layer: 'agent',
      summary: 'A model-powered actor that plans, uses tools, and iterates from feedback.',
      examples: ['Planner / 规划者', 'Coder / 编码者', 'Reviewer / 审阅者'],
    },
  },
  {
    id: 'tool',
    type: 'concept',
    position: { x: 840, y: 360 },
    zIndex: 2,
    data: {
      title: 'Tool / 工具',
      layer: 'execution',
      summary: 'A capability the agent can call to observe or change the world.',
      examples: ['Browser / 浏览器', 'Script / 脚本', 'API / 接口'],
    },
  },
];

const initialEdges: Edge[] = [
  edge('human-intent', 'agent', 'delegates goal / 委托目标'),
  edge('agent', 'tool', 'executes through / 通过工具执行'),
];

function edge(source: string, target: string, label: string): Edge {
  return {
    id: `${source}-${target}`,
    source,
    target,
    label,
    type: 'bezier',
    markerEnd: { type: MarkerType.ArrowClosed },
    zIndex: 0,
    style: { strokeWidth: 2 },
    labelStyle: { fill: '#334155', fontSize: 12, fontWeight: 800 },
    labelBgStyle: { fill: '#ffffff', fillOpacity: 0.94 },
    labelBgPadding: [8, 5],
  };
}

function loadSavedPositions(): SavedPositions {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(positionStorageKey);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as SavedPositions;
    return Object.fromEntries(
      Object.entries(parsed).filter(([, position]) => Number.isFinite(position.x) && Number.isFinite(position.y)),
    );
  } catch {
    return {};
  }
}

function savePositions(nodes: ConceptNode[]) {
  if (typeof window === 'undefined') return;
  const positions = Object.fromEntries(nodes.map((node) => [node.id, node.position]));
  window.localStorage.setItem(positionStorageKey, JSON.stringify(positions));
}

function applySavedPositions(nodes: ConceptNode[], savedPositions: SavedPositions): ConceptNode[] {
  return nodes.map((node) => ({
    ...node,
    position: savedPositions[node.id] ?? node.position,
    zIndex: 2,
  }));
}

function nodesOverlap(a: ConceptNode, b: ConceptNode) {
  const horizontal = Math.abs(a.position.x - b.position.x) < nodeBox.width + nodeBox.gap;
  const vertical = Math.abs(a.position.y - b.position.y) < nodeBox.height + nodeBox.gap;
  return horizontal && vertical;
}

function repelOverlappingNodes(nodes: ConceptNode[]) {
  const next = nodes.map((node) => ({ ...node, position: { ...node.position }, zIndex: 2 }));

  for (let pass = 0; pass < 10; pass += 1) {
    let moved = false;
    for (let i = 0; i < next.length; i += 1) {
      for (let j = i + 1; j < next.length; j += 1) {
        if (!nodesOverlap(next[i], next[j])) continue;
        const pushRight = next[j].position.x >= next[i].position.x;
        next[j].position = {
          x: next[j].position.x + (pushRight ? nodeBox.gap : -nodeBox.gap),
          y: next[i].position.y + nodeBox.height + nodeBox.gap,
        };
        moved = true;
      }
    }
    if (!moved) break;
  }

  return next;
}

function ConceptNodeView({ data }: NodeProps<ConceptNode>) {
  const color = layerColors[data.layer] ?? '#475467';
  return (
    <div
      className={clsx(
        'w-64 rounded-lg border bg-white p-4 shadow-sm transition',
        data.active && 'ring-4 ring-sky-200',
        data.connected && !data.active && 'ring-2 ring-slate-200',
        data.dimmed && 'opacity-25 grayscale',
      )}
      style={{ borderColor: data.active ? color : '#d0d5dd' }}
    >
      <Handle type="target" position={Position.Top} />
      <div className="text-sm font-black" style={{ color }}>
        {data.layer}
      </div>
      <div className="mt-1 text-lg font-black text-slate-900">{data.title}</div>
      <p className="mt-2 text-sm font-medium leading-5 text-slate-600">{data.summary}</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

const nodeTypes = { concept: ConceptNodeView };

function TooltipPortal({
  hovered,
  concept,
}: {
  hovered: { x: number; y: number; id: string } | null;
  concept: ConceptData | undefined;
}) {
  if (!hovered || !concept || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="pointer-events-none fixed z-[1000] max-w-xs rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm shadow-xl"
      style={{ left: hovered.x + 16, top: hovered.y + 16 }}
    >
      <div className="text-xs font-black uppercase tracking-wide text-slate-400">节点提示 / Node hint</div>
      <div className="mt-1 font-black text-slate-900">{concept.title}</div>
      <p className="mt-1 leading-5 text-slate-600">{concept.summary}</p>
    </div>,
    document.body,
  );
}

function buildInitialNodes() {
  return repelOverlappingNodes(applySavedPositions(initialNodes, loadSavedPositions()));
}

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(buildInitialNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedId, setSelectedId] = useState(initialNodes[0].id);
  const [query, setQuery] = useState('');
  const [focusMode, setFocusMode] = useState(true);
  const [hovered, setHovered] = useState<{ x: number; y: number; id: string } | null>(null);

  const byId = useMemo(() => new Map(initialNodes.map((node) => [node.id, node.data])), []);
  const selected = byId.get(selectedId) ?? initialNodes[0].data;

  const connectedIds = useMemo(() => {
    const ids = new Set<string>([selectedId]);
    edges.forEach((item) => {
      if (item.source === selectedId) ids.add(item.target);
      if (item.target === selectedId) ids.add(item.source);
    });
    return ids;
  }, [edges, selectedId]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    setNodes((current) =>
      current.map((node) => {
        const text = `${node.data.title} ${node.data.layer} ${node.data.summary} ${node.data.examples.join(' ')}`.toLowerCase();
        const searchMismatch = q !== '' && !text.includes(q);
        const focusMismatch = focusMode && !connectedIds.has(node.id);
        return {
          ...node,
          zIndex: 2,
          data: {
            ...node.data,
            active: node.id === selectedId,
            connected: connectedIds.has(node.id) && node.id !== selectedId,
            dimmed: searchMismatch || focusMismatch,
          },
        };
      }),
    );
    setEdges((current) =>
      current.map((item) => {
        const selectedEdge = item.source === selectedId || item.target === selectedId;
        return {
          ...item,
          zIndex: 0,
          animated: selectedEdge,
          style: {
            ...(item.style ?? {}),
            strokeWidth: selectedEdge ? 3 : 1.6,
            opacity: focusMode && !selectedEdge ? 0.45 : 0.9,
          },
        };
      }),
    );
  }, [connectedIds, focusMode, query, selectedId, setEdges, setNodes]);

  const handleNodeDragStop = useCallback(
    (_: unknown, draggedNode: ConceptNode) => {
      setNodes((current) => {
        const next = repelOverlappingNodes(
          current.map((node) => (node.id === draggedNode.id ? { ...node, position: draggedNode.position } : node)),
        );
        savePositions(next);
        return next;
      });
    },
    [setNodes],
  );

  const resetLayout = useCallback(() => {
    window.localStorage.removeItem(positionStorageKey);
    setNodes(repelOverlappingNodes(initialNodes));
    setSelectedId(initialNodes[0].id);
  }, [setNodes]);

  const clearFocus = useCallback(() => {
    setFocusMode(false);
    setHovered(null);
  }, []);

  const hoveredConcept = hovered ? byId.get(hovered.id) : undefined;

  return (
    <div className="grid h-screen grid-cols-[minmax(0,1fr)_340px] bg-slate-50 text-slate-900">
      <main className="relative">
        <div className="absolute left-4 top-4 z-10 flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <Network size={20} />
          <div>
            <h1 className="text-base font-black">概念关系图 / Concept Relationship Map</h1>
            <p className="text-xs font-semibold text-slate-500">拖动节点、缩放画布、查看概念详情。</p>
          </div>
          <label className="relative ml-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-9 w-64 rounded-md border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm font-semibold outline-none"
              placeholder="搜索概念 / Search"
            />
          </label>
          <label className="flex items-center gap-2 text-xs font-black text-slate-600">
            <input type="checkbox" checked={focusMode} onChange={(event) => setFocusMode(event.target.checked)} />
            聚焦 / Focus
          </label>
          <button
            type="button"
            onClick={clearFocus}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-200 px-3 text-xs font-black text-slate-600"
          >
            <X size={14} />
            清除聚焦
          </button>
          <button
            type="button"
            onClick={resetLayout}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-200 px-3 text-xs font-black text-slate-600"
          >
            <RotateCcw size={14} />
            重置布局
          </button>
        </div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={(_, node) => setSelectedId(node.id)}
          onNodeMouseEnter={(event, node) => setHovered({ x: event.clientX, y: event.clientY, id: node.id })}
          onNodeMouseMove={(event, node) => setHovered({ x: event.clientX, y: event.clientY, id: node.id })}
          onNodeMouseLeave={() => setHovered(null)}
          onNodeDragStop={handleNodeDragStop}
          onPaneClick={() => setHovered(null)}
          fitView
          minZoom={0.2}
          maxZoom={1.8}
          nodesDraggable
          panOnDrag
          zoomOnScroll
        >
          <Background />
          <Controls />
          <MiniMap pannable zoomable />
        </ReactFlow>
        <TooltipPortal hovered={hovered} concept={hoveredConcept} />
      </main>
      <aside className="overflow-y-auto border-l border-slate-200 bg-white p-5">
        <div className="rounded-lg border border-slate-200 p-4">
          <div className="text-xs font-black uppercase text-slate-500">{selected.layer}</div>
          <h2 className="mt-2 text-2xl font-black">{selected.title}</h2>
          <p className="mt-3 text-sm font-medium leading-6 text-slate-600">{selected.summary}</p>
        </div>
        <div className="mt-5 text-sm font-black">示例 / Examples</div>
        <div className="mt-2 space-y-2">
          {selected.examples.map((example) => (
            <div key={example} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold">
              {example}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
