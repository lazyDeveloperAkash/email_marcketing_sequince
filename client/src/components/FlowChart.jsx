import { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  addEdge,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const FlowChart = () => {
  const [nodes, setNodes] = useState([
    {
      id: 'node1',
      type: 'customNode',
      position: { x: 0, y: 0 },
      data: { label: (
        <div  className='react-flow__node-inner flex flex-col items-center px-3 gap-2'>
          +
          <p>Add Lead Source</p>
        </div>
      ) },
    },
    {
      id: 'node2',
      type: 'customNode',
      position: { x: 0, y: 150 },
      connconnectable: true,
      data: {
        label: (
          <div className="react-flow__node-inner w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center cursor-pointer border-2 border-gray-300">
            +
          </div>
        ),
      },
    },
  ]);

  const [edges, setEdges] = useState([
    {
      id: 'initialNode-addNode',
      source: 'node1',
      target: 'node2',
      animated: true,
    },
  ]);

  

  // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <div className="h-[90vh] flex flex-col">
      {/* Header Section */}
      <div className="h-[10vh] flex justify-between items-center px-[5vw]">
        <div>
          <h1 className="text-xl font-bold">Akashs First Sequence 🚀</h1>
          <p className="text-sm text-gray-600">
            Click on a block to configure and add it in sequence.
          </p>
        </div>
        <button className="bg-blue-500 text-white py-2 px-5 rounded-md font-bold">
          Save & Schedule
        </button>
      </div>

      {/* Flowchart Section */}
      <div className="h-[70vh] mx-[5vw] bg-gray-50 relative rounded-2xl overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          // onConnect={onConnect}
        >
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
};

export default FlowChart;
