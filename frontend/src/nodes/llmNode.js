// llmNode.js

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const LLMNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [model, setModel] = useState(data?.model || 'GPT-4');
  const [temperature, setTemperature] = useState(data?.temperature ?? 0.7);
  const [maxTokens, setMaxTokens] = useState(data?.maxTokens ?? 256);

  const handleModelChange = (e) => {
    setModel(e.target.value);
    updateNodeField(id, 'model', e.target.value);
  };

  const handleTemperatureChange = (e) => {
    const val = parseFloat(e.target.value);
    setTemperature(val);
    updateNodeField(id, 'temperature', val);
  };

  const handleMaxTokensChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setMaxTokens(val);
    updateNodeField(id, 'maxTokens', val);
  };

  return (
    <BaseNode
      id={id}
      title="LLM"
      icon={Sparkles}
      category="ai"
      inputs={[
        { id: `${id}-system`, label: 'System' },
        { id: `${id}-prompt`, label: 'Prompt' },
      ]}
      outputs={[{ id: `${id}-response`, label: 'Response' }]}
      selected={selected}
    >
      <div className="node-field-group">
        <label className="node-label">Model</label>
        <select
          className="node-select"
          value={model}
          onChange={handleModelChange}
        >
          <option value="GPT-4">GPT-4</option>
          <option value="GPT-3.5">GPT-3.5</option>
          <option value="Claude 3">Claude 3</option>
          <option value="Gemini Pro">Gemini Pro</option>
          <option value="LLaMA 3">LLaMA 3</option>
        </select>
      </div>
      <div className="node-field-group">
        <label className="node-label">Temperature</label>
        <div className="node-range-group">
          <input
            className="node-range"
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={temperature}
            onChange={handleTemperatureChange}
          />
          <span>{temperature.toFixed(1)}</span>
        </div>
      </div>
      <div className="node-field-group">
        <label className="node-label">Max Tokens</label>
        <input
          className="node-input"
          type="number"
          value={maxTokens}
          onChange={handleMaxTokensChange}
        />
      </div>
    </BaseNode>
  );
};
