/**
 * Hook para manejar acciones locales dentro de una columna específica.
 * @param {Object} params
 * @param {string} params.columna - Nombre de la columna.
 * @param {Object} params.tareas - Estado global de tareas.
 * @param {Function} params.setTareas - Setter global de tareas.
 */
export const useColumna = ({ columna, tareas, setTareas }) => {
  // ✅ Agregar tarea a la columna
  const agregarTarea = (columna, tarea) => {
  if (!columna || typeof columna !== 'string') {
    console.warn('Columna inválida:', columna);
    return;
  }

  setTareas(prev => ({
    ...prev,
    [columna]: [
      ...(Array.isArray(prev[columna]) ? prev[columna] : []),
      tarea
    ]
  }));
};


  // ✅ Eliminar tarea de la columna
  const eliminarTarea = (id) => {
    setTareas(prev => ({
      ...prev,
      [columna]: prev[columna].filter(t => t.id !== id)
    }));
  };

  // ✅ Actualizar tarea de la columna
  const actualizarTarea = (id, nuevosDatos) => {
    setTareas(prev => ({
      ...prev,
      [columna]: prev[columna].map(t =>
        t.id === id ? { ...t, ...nuevosDatos } : t
      )
    }));
  };

  // ✅ Contar tareas en la columna
  const contarTareas = () => tareas[columna]?.length || 0;

  // ✅ Buscar tareas por texto
  const buscarTareas = (query) => {
    return tareas[columna]?.filter(t =>
      t.titulo.toLowerCase().includes(query.toLowerCase()) ||
      t.descripcion.toLowerCase().includes(query.toLowerCase())
    ) || [];
  };

  // ✅ Ordenar tareas por campo
  const ordenarTareas = (campo = 'titulo') => {
    return [...(tareas[columna] || [])].sort((a, b) =>
      a[campo].localeCompare(b[campo])
    );
  };

  return {
    agregarTarea,
    eliminarTarea,
    actualizarTarea,
    contarTareas,
    buscarTareas,
    ordenarTareas
  };
};
