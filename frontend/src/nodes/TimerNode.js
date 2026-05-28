// TimerNode.js

import { useState } from 'react';
import { Clock } from 'lucide-react';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const TimerNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [duration, setDuration] = useState(data?.duration ?? 5);

  const handleDurationChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setDuration(val);
    updateNodeField(id, 'duration', val);
  };

  return (
    <BaseNode
      id={id}
      title="Timer"
      icon={Clock}
      category="integration"
      inputs={[{ id: `${id}-trigger`, label: 'Trigger' }]}
      outputs={[{ id: `${id}-output`, label: 'Output' }]}
      selected={selected}
    >
      <div className="node-field-group">
        <label className="node-label">Duration (sec)</label>
        <div className="node-range-group">
          <input
            className="node-range"
            type="range"
            min={1}
            max={60}
            step={1}
            value={duration}
            onChange={handleDurationChange}
          />
          <span>{duration}s</span>
        </div>
      </div>
    </BaseNode>
  );
};
