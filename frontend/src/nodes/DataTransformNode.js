// DataTransformNode.js

import { useState } from 'react';
import { Shuffle } from 'lucide-react';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const DataTransformNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [transformType, setTransformType] = useState(data?.transformType || 'Uppercase');

  const handleTypeChange = (e) => {
    setTransformType(e.target.value);
    updateNodeField(id, 'transformType', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Data Transform"
      icon={Shuffle}
      category="transform"
      inputs={[{ id: `${id}-input`, label: 'Input' }]}
      outputs={[{ id: `${id}-output`, label: 'Output' }]}
      selected={selected}
    >
      <div className="node-field-group">
        <label className="node-label">Transform Type</label>
        <select
          className="node-select"
          value={transformType}
          onChange={handleTypeChange}
        >
          <option value="Uppercase">Uppercase</option>
          <option value="Lowercase">Lowercase</option>
          <option value="Trim">Trim</option>
          <option value="JSON Parse">JSON Parse</option>
          <option value="JSON Stringify">JSON Stringify</option>
        </select>
      </div>
    </BaseNode>
  );
};
