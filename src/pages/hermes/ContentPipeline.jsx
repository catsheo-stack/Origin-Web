import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import PageHeader from '@/components/hermes/ui/PageHeader';
import { pipelineColumns as initialColumns, priorityDot } from '@/data/hermes/pipeline';

export default function ContentPipeline() {
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    const next = columns.map((c) => ({ ...c, cards: [...c.cards] }));
    const srcCol = next.find((c) => c.id === source.droppableId);
    const dstCol = next.find((c) => c.id === destination.droppableId);
    const [moved] = srcCol.cards.splice(source.index, 1);
    dstCol.cards.splice(destination.index, 0, moved);
    setColumns(next);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      <PageHeader title="Content Pipeline" subtitle="Drag cards across stages from idea to published." />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4 flex-1">
          {columns.map((col) => (
            <div key={col.id} className="w-72 shrink-0 flex flex-col">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">{col.title}</span>
                  <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">
                    {col.cards.length}
                  </span>
                </div>
              </div>
              <Droppable droppableId={col.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 space-y-2 p-2 rounded-xl transition-colors min-h-[100px] ${
                      snapshot.isDraggingOver ? 'bg-gray-100' : 'bg-gray-50'
                    }`}
                  >
                    {col.cards.map((card, idx) => (
                      <Draggable key={card.id} draggableId={card.id} index={idx}>
                        {(p) => (
                          <div
                            ref={p.innerRef}
                            {...p.draggableProps}
                            {...p.dragHandleProps}
                            className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <p className="text-sm font-medium text-gray-900 leading-snug">{card.title}</p>
                              <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${priorityDot[card.priority]}`} />
                            </div>
                            <span className="text-xs text-gray-400">{card.tag}</span>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}