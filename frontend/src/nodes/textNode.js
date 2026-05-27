// textNode.js

import { useState } from 'react';
import { Type } from 'lucide-react';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const TextNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  // Extract {{variables}} from text
  const extractVariables = (text) => {
    const regex = /\{\{(\w+)\}\}/g;
    const vars = new Set();
    let match;
    while ((match = regex.exec(text)) !== null) {
      vars.add(match[1]);
    }
    return Array.from(vars);
  };

  const variables = extractVariables(currText);
  const dynamicInputs = variables.map((v) => ({
    id: `${id}-${v}`,
    label: v,
  }));

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    updateNodeField(id, 'text', e.target.value);
    // Auto-resize
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <BaseNode
      id={id}
      title="Text"
      icon={Type}
      category="transform"
      inputs={dynamicInputs}
      outputs={[{ id: `${id}-output`, label: 'Output' }]}
      selected={selected}
    >
      <div className="node-field-group">
        <label className="node-label">Text</label>
        <textarea
          className="node-textarea"
          value={currText}
          onChange={handleTextChange}
          style={{
            minHeight: '60px',
            width: '100%',
            resize: 'vertical',
            fontFamily: "'SF Mono', 'Fira Code', 'Cascadia Code', monospace",
          }}
        />
      </div>
    </BaseNode>
  );
};
