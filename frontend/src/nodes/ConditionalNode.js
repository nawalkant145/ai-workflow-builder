// ConditionalNode.js

import { useState } from 'react';
import { GitBranch } from 'lucide-react';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const ConditionalNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [condition, setCondition] = useState(data?.condition || 'equals');
  const [value, setValue] = useState(data?.value || '');

  const handleConditionChange = (e) => {
    setCondition(e.target.value);
    updateNodeField(id, 'condition', e.target.value);
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
    updateNodeField(id, 'value', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Conditional"
      icon={GitBranch}
      category="logic"
      inputs={[{ id: `${id}-input`, label: 'Input' }]}
      outputs={[
        { id: `${id}-true`, label: 'True' },
        { id: `${id}-false`, label: 'False' },
      ]}
      selected={selected}
    >
      <div className="node-field-group">
        <label className="node-label">Condition</label>
        <select
          className="node-select"
          value={condition}
          onChange={handleConditionChange}
        >
          <option value="equals">Equals (==)</option>
          <option value="not-equals">Not Equals (!=)</option>
          <option value="contains">Contains</option>
          <option value="greater-than">Greater Than (&gt;)</option>
          <option value="less-than">Less Than (&lt;)</option>
        </select>
      </div>
      <div className="node-field-group">
        <label className="node-label">Compare Value</label>
        <input
          className="node-input"
          type="text"
          value={value}
          onChange={handleValueChange}
        />
      </div>
    </BaseNode>
  );
};
