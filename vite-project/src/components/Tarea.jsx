import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import '../index.css'; // Asegúrate de que esta ruta sea correcta según tu estructura

function Tarea({ id, titulo, descripcion, usuario, colaboradores, onEditar, onDelete, columna }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({ id });

  const dynamicStyle = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    transition,
  };

  return (
    <div ref={setNodeRef} className="tarea" style={dynamicStyle} {...attributes}>
      
      {/* ✅ Zona draggable */}
      <div {...listeners} className="contenido-draggable" style={{ cursor: 'grab' }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.15em', textAlign: 'center' }}>{titulo}</div>

        {descripcion && <div className="descripcion">{descripcion}</div>}

        {usuario && (
          <div style={{ fontSize: '0.95em', color: '#1e88e5' }}>
            <b>Usuario:</b> {usuario}
          </div>
        )}

        {colaboradores?.length > 0 && (
          <div style={{ fontSize: '0.93em', color: '#e53935' }}>
            <b>Colaboradores:</b> {colaboradores.join(', ')}
          </div>
        )}
      </div>

      <div className="button-container">
       
  <button
    className="icon-button"
    onClick={(e) => {
      e.stopPropagation();
      e.preventDefault();
      onEditar({
        id,
        titulo,
        descripcion,
        usuario,
        colaboradores,
        columna // ✅ ahora sí existe
      });
    }}
    title="Editar"
  >
    <img
      src="https://cdn-icons-png.flaticon.com/512/764/764599.png"
      alt="Editar"
      width="24"
      height="24"
    />
  </button>
        <button className="icon-button" onClick={(e) => {
          e.stopPropagation();
          e.preventDefault(); 
          onDelete?.(id)}} 
          title="Eliminar"
          style={{ fontSize: '1.5em', color: 'red', background: 'none', border: 'none', cursor: 'pointer', marginLeft: '8px' }}>
          ×
        </button>
      </div>
    </div>
  );
}

export default Tarea;
