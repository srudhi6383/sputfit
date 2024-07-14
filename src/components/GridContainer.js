import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ResizableRectangle from './ResizableRectangle';

const GridContainer = () => {
  const [items, setItems] = useState([
    { id: '1', title: 'Rectangle 1', width: 200, height: 200 },
    { id: '2', title: 'Rectangle 2', width: 150, height: 250 },
    { id: '3', title: 'Rectangle 3', width: 250, height: 150 },
  ]);

  const onDragEnd = (result) => {
    // Reorder items if dropped inside the droppable area
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);

    setItems(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="grid grid-cols-3 gap-4 p-4"
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex flex-col bg-white shadow-md rounded-lg"
                  >
                    <ResizableRectangle item={item} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default GridContainer;
