// store.js
// Zustand state management for the pipeline builder

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},

  // Generate unique node ID by type
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  // Add a new node
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },

  // Remove a node and all its connected edges
  removeNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== nodeId),
      edges: get().edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
    });
  },

  // Remove a specific edge
  removeEdge: (edgeId) => {
    set({
      edges: get().edges.filter((edge) => edge.id !== edgeId),
    });
  },

  // Apply React Flow node changes (drag, select, etc.)
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  // Apply React Flow edge changes (select, remove, etc.)
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  // Connect two nodes with an edge
  onConnect: (connection) => {
    // Prevent duplicate connections to same target handle
    const existingEdge = get().edges.find(
      (edge) =>
        edge.target === connection.target &&
        edge.targetHandle === connection.targetHandle
    );
    if (existingEdge) return;

    set({
      edges: addEdge(
        {
          ...connection,
          type: 'customEdge',
          animated: true,
          markerEnd: {
            type: MarkerType.Arrow,
            height: 20,
            width: 20,
            color: '#6366f1',
          },
          style: { stroke: '#475569', strokeWidth: 2 },
        },
        get().edges
      ),
    });
  },

  // Update a specific field on a node's data
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { ...node.data, [fieldName]: fieldValue },
          };
        }
        return node;
      }),
    });
  },

  // Update node dimensions
  updateNodeDimensions: (nodeId, width, height) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            width,
            height,
          };
        }
        return node;
      }),
    });
  },

  // Get a single node by ID
  getNodeById: (nodeId) => {
    return get().nodes.find((node) => node.id === nodeId);
  },

  // Remove edges connected to a specific handle (for dynamic handle cleanup)
  removeEdgesByHandle: (nodeId, handleId) => {
    set({
      edges: get().edges.filter(
        (edge) =>
          !(
            (edge.source === nodeId && edge.sourceHandle === handleId) ||
            (edge.target === nodeId && edge.targetHandle === handleId)
          )
      ),
    });
  },

  // Clear entire canvas
  clearCanvas: () => {
    set({ nodes: [], edges: [], nodeIDs: {} });
  },

  // Serialize pipeline data for API submission
  getPipelineData: () => {
    const { nodes, edges } = get();
    return {
      nodes: nodes.map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: node.data,
      })),
      edges: edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle,
      })),
    };
  },
}));
