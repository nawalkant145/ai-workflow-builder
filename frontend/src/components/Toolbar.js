import { useState } from 'react';
import { DraggableNode } from './DraggableNode';
import { 
  Download, Upload, Sparkles, Type, Calculator, 
  Globe, GitBranch, Database, Shuffle, Search,
  ChevronDown, ChevronRight, Workflow
} from 'lucide-react';

const nodeCategories = [
  {
    name: 'Input / Output',
    icon: Download,
    nodes: [
      { type: 'customInput', label: 'Input', icon: Download, description: 'Pipeline input source' },
      { type: 'customOutput', label: 'Output', icon: Upload, description: 'Pipeline output destination' },
    ]
  },
  {
    name: 'AI & Logic',
    icon: Sparkles,
    nodes: [
      { type: 'llm', label: 'LLM', icon: Sparkles, description: 'Large Language Model' },
      { type: 'conditional', label: 'Conditional', icon: GitBranch, description: 'If/else branching' },
    ]
  },
  {
    name: 'Data & Transform',
    icon: Shuffle,
    nodes: [
      { type: 'text', label: 'Text', icon: Type, description: 'Text with variables' },
      { type: 'math', label: 'Math', icon: Calculator, description: 'Math operations' },
      { type: 'dataTransform', label: 'Transform', icon: Shuffle, description: 'Data transformations' },
    ]
  },
  {
    name: 'Integration',
    icon: Globe,
    nodes: [
      { type: 'api', label: 'API', icon: Globe, description: 'HTTP requests' },
      { type: 'database', label: 'Database', icon: Database, description: 'Database queries' },
    ]
  }
];

export const PipelineToolbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState(
    () => new Set(nodeCategories.map((cat) => cat.name))
  );

  const toggleCategory = (categoryName) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryName)) {
        next.delete(categoryName);
      } else {
        next.add(categoryName);
      }
      return next;
    });
  };

  const filteredCategories = nodeCategories
    .map((category) => ({
      ...category,
      nodes: category.nodes.filter((node) =>
        node.label.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.nodes.length > 0);

  return (
    <div className="toolbar">
      <div className="toolbar-brand">
        <Workflow size={22} />
        <h2>Pipeline Builder</h2>
      </div>

      <div className="toolbar-search">
        <div className="toolbar-search-icon">
          <Search size={16} />
        </div>
        <input
          type="text"
          placeholder="Search nodes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="toolbar-categories">
        {filteredCategories.map((category) => {
          const isExpanded = expandedCategories.has(category.name);
          const CategoryIcon = category.icon;

          return (
            <div className="toolbar-category" key={category.name}>
              <div
                className="toolbar-category-header"
                onClick={() => toggleCategory(category.name)}
              >
                <CategoryIcon size={16} />
                <h3>{category.name}</h3>
                {isExpanded ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </div>
              <div
                className={`toolbar-category-nodes${
                  isExpanded ? '' : ' collapsed'
                }`}
              >
                {category.nodes.map((node) => (
                  <DraggableNode
                    key={node.type}
                    type={node.type}
                    label={node.label}
                    icon={node.icon}
                    description={node.description}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
