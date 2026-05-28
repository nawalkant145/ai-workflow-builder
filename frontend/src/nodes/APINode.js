// APINode.js

import { useState } from 'react';
import { Globe } from 'lucide-react';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const APINode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || 'https://api.example.com/data');

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
    updateNodeField(id, 'method', e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    updateNodeField(id, 'url', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="API Request"
      icon={Globe}
      category="integration"
      inputs={[{ id: `${id}-body`, label: 'Body' }]}
      outputs={[{ id: `${id}-response`, label: 'Response' }]}
      selected={selected}
    >
      <div className="node-field-group">
        <label className="node-label">Method</label>
        <select
          className="node-select"
          value={method}
          onChange={handleMethodChange}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <div className="node-field-group">
        <label className="node-label">URL</label>
        <input
          className="node-input"
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="https://..."
        />
      </div>
    </BaseNode>
  );
};
