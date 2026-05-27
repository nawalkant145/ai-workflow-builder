import { useState } from 'react';
import { Play, Loader2 } from 'lucide-react';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';

export const SubmitButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { nodes, edges } = useStore(
    (state) => ({ nodes: state.nodes, edges: state.edges }),
    shallow
  );

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const serializedNodes = nodes.map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: node.data,
      }));
      const serializedEdges = edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle,
      }));

      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes: serializedNodes, edges: serializedEdges }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      alert(
        `Pipeline Analysis:\n\nNodes: ${result.num_nodes}\nEdges: ${result.num_edges}\nIs DAG: ${result.is_dag}`
      );
    } catch (error) {
      alert(`Error analyzing pipeline: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="submit-bar">
      <div className="submit-bar-info">
        <span>{nodes.length} nodes</span>
        <span className="submit-bar-dot">·</span>
        <span>{edges.length} edges</span>
      </div>
      <button className="submit-btn" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="submit-btn-spinner" size={18} />
        ) : (
          <Play size={18} />
        )}
        <span>{isLoading ? 'Analyzing...' : 'Run Pipeline'}</span>
      </button>
    </div>
  );
};
