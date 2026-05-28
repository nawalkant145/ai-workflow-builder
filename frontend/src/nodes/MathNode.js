// MathNode.js

import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const MathNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [operation, setOperation] = useState(data?.operation || 'Add');

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
    updateNodeField(id, 'operation', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Math"
      icon={Calculator}
      category="transform"
      inputs={[
        { id: `${id}-a`, label: 'A' },
        { id: `${id}-b`, label: 'B' },
      ]}
      outputs={[{ id: `${id}-result`, label: 'Result' }]}
      selected={selected}
    >
      <div className="node-field-group">
        <label className="node-label">Operation</label>
        <select
          className="node-select"
          value={operation}
          onChange={handleOperationChange}
        >
          <option value="Add">Add</option>
          <option value="Subtract">Subtract</option>
          <option value="Multiply">Multiply</option>
          <option value="Divide">Divide</option>
          <option value="Modulo">Modulo</option>
          <option value="Power">Power</option>
        </select>
      </div>
      <div className="node-preview" style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
        A {operation === 'Add' ? '+' : operation === 'Subtract' ? '-' : operation === 'Multiply' ? '*' : operation === 'Divide' ? '/' : operation === 'Modulo' ? '%' : '^'} B = Result
      </div>
    </BaseNode>
  );
};
