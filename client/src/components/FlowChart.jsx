import { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
} from 'react-flow-renderer';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Lead Source' },
    position: { x: 250, y: 5 }, // Ensure initial position is defined
  },
];

const initialEdges = [];

const FlowChart = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  // Handle adding new nodes dynamically
  const addNode = useCallback(() => {
    const newNode = {
      id: `${nodes.length + 1}`,
      data: { label: `Node ${nodes.length + 1}` },
      position: { x: Math.random() * 400, y: Math.random() * 400 }, // Always provide a valid position
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  }, [nodes]);

  // Update nodes safely
  const onNodesChange = useCallback(
    (changes) =>
      setNodes((nds) => {
        const updatedNodes = nds.map((node) => {
          const change = changes.find((c) => c.id === node.id);
          if (change) {
            return {
              ...node,
              ...change,
              position: change.position || node.position || { x: 0, y: 0 },
            };
          }
          return node;
        });
        return updatedNodes;
      }),
    []
  );

  // Update edges safely
  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) =>
      eds.map((edge) => changes.find((c) => c.id === edge.id) || edge)
    );
  }, []);

  // Handle new connections
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div className="h-screen bg-gray-100">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Email Marketing Flowchart</h1>
        <button
          onClick={addNode}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Node
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default FlowChart;
