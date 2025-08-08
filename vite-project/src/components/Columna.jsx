import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import Tarea from './Tarea';
import '../index.css';

function Columna({ id, titulo, tareas, onAgregarTarea, onEditarTarea, onDeleteTarea }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className="columna-wrapper">
      <div className="columna-header">
        <h2>{titulo}</h2>
        <button onClick={onAgregarTarea} className="agregar-tarea-button">
          <span>+</span>
        </button>
      </div>
      <div
        ref={setNodeRef}
        className={`columna-droppable${isOver ? ' over' : ''}`}
      >
        {tareas.map(t => (
          <Tarea
            key={t.id + '-' + t.usuario}
            {...t}
            columna={id}
            onEditar={onEditarTarea}
            onDelete={() => onDeleteTarea(id, t.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Columna;
