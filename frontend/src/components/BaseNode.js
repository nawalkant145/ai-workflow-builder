// BaseNode.js
// Shared wrapper component for all pipeline nodes

import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, title, icon: Icon, category = 'transform', inputs = [], outputs = [], selected, children }) => {

  // Compute handle positions evenly distributed along the node side
  const getHandleStyle = (index, total) => {
    if (total === 1) return { top: '50%' };
    const spacing = 100 / (total + 1);
    return { top: `${spacing * (index + 1)}%` };
  };

  return (
    <div className={`base-node category-${category}${selected ? ' selected' : ''}`}>
      {/* Header */}
      <div className="base-node-header">
        <div className="base-node-icon">
          {Icon && <Icon size={15} />}
        </div>
        <span className="base-node-title">{title}</span>
      </div>

      {/* Body */}
      <div className="base-node-body">
        {children}
      </div>

      {/* Input Handles (Left) */}
      {inputs.map((input, i) => (
        <div key={input.id} className="handle-wrapper handle-left" style={getHandleStyle(i, inputs.length)}>
          <Handle
            type="target"
            position={Position.Left}
            id={input.id}
            style={getHandleStyle(i, inputs.length)}
          />
          {input.label && (
            <span className="handle-label handle-label-left">{input.label}</span>
          )}
        </div>
      ))}

      {/* Output Handles (Right) */}
      {outputs.map((output, i) => (
        <div key={output.id} className="handle-wrapper handle-right" style={getHandleStyle(i, outputs.length)}>
          <Handle
            type="source"
            position={Position.Right}
            id={output.id}
            style={getHandleStyle(i, outputs.length)}
          />
          {output.label && (
            <span className="handle-label handle-label-right">{output.label}</span>
          )}
        </div>
      ))}
    </div>
  );
};
