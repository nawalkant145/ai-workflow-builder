export const DraggableNode = ({ type, label, icon: Icon, description }) => {
  const onDragStart = (event) => {
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify({ nodeType: type })
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragEnd = (event) => {
    event.dataTransfer.clearData('application/reactflow');
  };

  return (
    <div
      className="draggable-node"
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="draggable-node-icon">
        <Icon size={18} />
      </div>
      <span className="draggable-node-label">{label}</span>
    </div>
  );
};
