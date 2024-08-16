import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './DragDrop.styles.css';

const DragDrop = ({ sections, onDragEnd, onLeadClick }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='section-container'>
        {Object.keys(sections).map((sectionKey) => (
          <Droppable droppableId={sectionKey} key={sectionKey}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className='title-list'
              >
                <h2>
                  {sectionKey === 'potential' ? 'Cliente Potencial' :
                    sectionKey === 'confirmed' ? 'Dados Confirmados' : 'Análise do Lead'}
                </h2>
                {sections[sectionKey].length > 0 ? (
                  sections[sectionKey].map((lead, index) => (
                    <Draggable key={lead.id} draggableId={lead.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`draggable-item ${index % 2 === 0 ? 'even-lead' : 'odd-lead'}`}
                          onClick={() => onLeadClick(lead)}
                        >
                          {lead.name}
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <div>Nenhum lead na seção</div>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default DragDrop;
