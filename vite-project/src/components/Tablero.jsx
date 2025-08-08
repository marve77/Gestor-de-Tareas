import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import '../Tablero.css'; // Ajusta la ruta si es necesario

function Tablero({ id, titulo, descripcion, usuario, colaboradores }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({ id });

  const dynamicStyle = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className="tablero"
      style={dynamicStyle}
      {...listeners}
      {...attributes}
    >
      <div className="tablero-titulo">{titulo}</div>

      {descripcion && <div className="tablero-descripcion">{descripcion}</div>}

      {usuario && (
        <div className="tablero-usuario">
          <b>Usuario:</b> {usuario}
        </div>
      )}

      {colaboradores?.length > 0 && (
        <div className="tablero-colaboradores">
          <b>Colaboradores:</b> {colaboradores.join(', ')}
        </div>
      )}
    </div>
  );
}

export default Tablero;
