
import React, { useEffect, useState } from 'react';
import '../index.css';

function FormularioTarea({ tarea, onSave, onCancel, columna, formData, handleFormChange, usuarios }) {
  // No se usan estados locales, todo viene del hook

  const handleSubmit = e => {
    e.preventDefault();
    const usuarioStr = String(formData.usuario || '');
    console.log('Guardando tarea con usuario:', usuarioStr);
    const nuevaTarea = {
      id: tarea && tarea.id ? tarea.id : `${columna}-${Date.now()}`,
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      usuario: usuarioStr,
      colaboradores: formData.colaboradores
        .split(',')
        .map(c => c.trim())
        .filter(Boolean)
    };
    onSave(columna, nuevaTarea);
  };

  return (
    <div className="formulario-overlay">
      <form className="formulario-tarea" onSubmit={handleSubmit} autoComplete="off">
        <button
          type="button"
          onClick={onCancel}
          className="cerrar-formulario"
          title="Cerrar"
        >
          &times;
        </button>

        <h3 className="formulario-titulo">
          {tarea ? 'Editar tarea en ' : 'Agregar tarea a '}
          <span className="columna-activa">{columna}</span>
        </h3>

        <label>Título:</label>
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleFormChange}
          required
          className="input-campo"
        />

        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleFormChange}
          className="textarea-campo"
        />

        <label>Usuario:</label>
        <select
          name="usuario"
          value={formData.usuario}
          onChange={handleFormChange}
          required
          className="select-campo"
        >
          <option value="">Selecciona un usuario</option>
          {usuarios.map((u, index) => (
            <option key={index} value={u.usuario}>
              {u.usuario} ({u.area})
            </option>
          ))}
        </select>

        <label>Colaboradores (separados por coma):</label>
        <input
          type="text"
          name="colaboradores"
          value={formData.colaboradores}
          onChange={handleFormChange}
          className="input-campo"
        />

        <div className="formulario-botones">
          <button type="submit" className={`boton-${tarea ? 'editar' : 'agregar'}`}>
            {tarea ? 'Editar tarea' : 'Agregar tarea'}
          </button>
          <button type="button" onClick={onCancel} className="boton-cancelar">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioTarea;
