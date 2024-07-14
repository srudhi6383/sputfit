import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ResizableBox } from 'react-resizable';
import './App.css';
import GraphComponent from './components/Graph';
import RectangleBarComponent from './components/RectangleBar';

function App() {
  const [workoutBlocks, setWorkoutBlocks] = useState([
    { id: 'warm-up', type: 'Warm Up', height: 100, width: 200, substeps: [] },
    { id: 'main-set', type: 'Main Set', height: 200, width: 400, substeps: [] },
    { id: 'cool-down', type: 'Cool Down', height: 100, width: 200, substeps: [] },
  ]);

  const [selectedBlockId, setSelectedBlockId] = useState(null);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(workoutBlocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setWorkoutBlocks(items);
  };

  const handleResize = (index, size) => {
    const newWorkoutBlocks = [...workoutBlocks];
    const block = newWorkoutBlocks[index];
    block.width = size.width;
    block.height = size.height;
    setWorkoutBlocks(newWorkoutBlocks);
  };

  const handleBlockClick = (blockId) => {
    setSelectedBlockId(selectedBlockId === blockId ? null : blockId);
  };

  const addSubstep = (blockId) => {
    const newWorkoutBlocks = [...workoutBlocks];
    const block = newWorkoutBlocks.find((block) => block.id === blockId);
    block.substeps.push({ id: `${blockId}-substep-${block.substeps.length + 1}`, name: 'Run', distance: 2 });
    setWorkoutBlocks(newWorkoutBlocks);
  };

  const handleSubstepChange = (blockId, substepIndex, field, value) => {
    const newWorkoutBlocks = [...workoutBlocks];
    const block = newWorkoutBlocks.find((block) => block.id === blockId);
    block.substeps[substepIndex][field] = value;
    setWorkoutBlocks(newWorkoutBlocks);
  };

  const handleSubstepDelete = (blockId, substepIndex) => {
    const newWorkoutBlocks = [...workoutBlocks];
    const block = newWorkoutBlocks.find((block) => block.id === blockId);
    block.substeps.splice(substepIndex, 1);
    setWorkoutBlocks(newWorkoutBlocks);
  };

  // Example data for graph and rectangle bar components
  const graphData = [5, 10, 8, 15, 12];
  const rectangleBarData = [
    { label: 'A', width: '100px', height: '50px' },
    { label: 'B', width: '150px', height: '50px' },
    { label: 'C', width: '120px', height: '50px' },
  ];

  return (
    <div className="container">
      <div className="header">
        <h1>Workout Builder</h1>
      </div>
      <div className="workout-builder">
        <div className="left-panel">
          <h2>Click or drag the blocks to build your workout</h2>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="workout-blocks">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="block-container"
                >
                  {workoutBlocks.map((block, index) => (
                    <Draggable key={block.id} draggableId={block.id} index={index}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className={`block ${selectedBlockId === block.id ? 'selected' : ''}`}
                          onClick={() => handleBlockClick(block.id)}
                        >
                          <ResizableBox
                            width={block.width}
                            height={block.height}
                            onResizeStop={(e, data) => handleResize(index, data.size)}
                            minConstraints={[150, 100]}
                            maxConstraints={[500, 300]}
                            resizeHandles={['se']}
                            className="resizable-box"
                          >
                            <div className="block-content">
                              {block.type}
                            </div>
                          </ResizableBox>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="right-panel">
          <GraphComponent data={graphData} />
          <RectangleBarComponent data={rectangleBarData} />
          <div className="progress-bar">
            {workoutBlocks.map((block) => (
              <div
                key={block.id}
                className="progress-bar-segment"
                style={{ flex: block.width / 100 }}
              >
                <span>{block.type}</span>
              </div>
            ))}
          </div>
          <div className="details-container">
            {workoutBlocks.map((block, index) => (
              <div key={block.id} className={`block-details ${selectedBlockId === block.id ? 'active' : ''}`}>
                <div className="block-header">
                  <h3>{block.type}</h3>
                  <div className="block-options">
                    <span className="options-icon">⋮</span>
                    <span className="options-icon">×</span>
                  </div>
                </div>
                <div className="block-substeps">
                  {block.substeps.map((substep, substepIndex) => (
                    <div key={substep.id} className="substep">
                      <div className="substep-content">
                        <span className="substep-icon">⚡</span>
                        <input
                          type="text"
                          value={substep.name}
                          onChange={(e) => handleSubstepChange(block.id, substepIndex, 'name', e.target.value)}
                          className="substep-name"
                        />
                        <input
                          type="number"
                          value={substep.distance}
                          onChange={(e) => handleSubstepChange(block.id, substepIndex, 'distance', e.target.value)}
                          className="substep-distance"
                        />
                      </div>
                      <div className="substep-options">
                        <span className="options-icon" onClick={() => handleSubstepDelete(block.id, substepIndex)}>×</span>
                      </div>
                    </div>
                  ))}
                  {selectedBlockId === block.id && (
                    <button className="add-substep-button" onClick={() => addSubstep(block.id)}>
                      Add Substep
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
