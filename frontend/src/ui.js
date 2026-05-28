// ui.js
// Pipeline canvas with React Flow

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { MathNode } from './nodes/MathNode';
import { TimerNode } from './nodes/TimerNode';
import { APINode } from './nodes/APINode';
import { ConditionalNode } from './nodes/ConditionalNode';
import { DataTransformNode } from './nodes/DataTransformNode';
import { CustomEdge } from './components/CustomEdge';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  math: MathNode,
  timer: TimerNode,
  api: APINode,
  conditional: ConditionalNode,
  dataTransform: DataTransformNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const minimapStyle = {
  height: 100,
  width: 140,
};

const minimapNodeColor = (node) => {
  const colors = {
    customInput: '#10b981',
    customOutput: '#10b981',
    llm: '#8b5cf6',
    text: '#3b82f6',
    math: '#06b6d4',
    api: '#06b6d4',
    conditional: '#f59e0b',
    dataTransform: '#3b82f6',
    database: '#06b6d4',
  };
  return colors[node.type] || '#6366f1';
};

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    return { id: nodeID, nodeType: `${type}` };
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(
          event.dataTransfer.getData('application/reactflow')
        );
        const type = appData?.nodeType;

        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} className="canvas-wrapper">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        snapToGrid
        connectionLineType="smoothstep"
        connectionLineStyle={{ stroke: '#6366f1', strokeWidth: 2, strokeDasharray: '5 5' }}
        defaultEdgeOptions={{
          type: 'customEdge',
          animated: true,
          style: { stroke: '#475569', strokeWidth: 2 },
        }}
        fitView
        deleteKeyCode={['Backspace', 'Delete']}
      >
        <Background
          variant="dots"
          gap={gridSize}
          size={1}
          color="rgba(148, 163, 184, 0.08)"
        />
        <Controls showInteractive={false} />
        <MiniMap
          style={minimapStyle}
          nodeColor={minimapNodeColor}
          maskColor="rgba(99, 102, 241, 0.08)"
          pannable
          zoomable
        />
      </ReactFlow>
    </div>
  );
};
