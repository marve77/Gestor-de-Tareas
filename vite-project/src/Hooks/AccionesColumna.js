/**
 * Hook para manejar acciones globales relacionadas con columnas.
 * @param {Object} params
 * @param {Function} params.setFormColumna - Setter para columna activa del formulario.
 * @param {Function} params.setFormVisible - Setter para mostrar/ocultar formulario.
 * @param {Function} params.setFormData - Setter para limpiar datos del formulario.
 * @param {Object} params.tareas - Estado global de tareas por columna.
 * @param {Function} params.setTareas - Setter global de tareas.
 */
export const useAccionesColumna = ({ setFormColumna, setFormVisible, setFormData, tareas, setTareas }) => {
  const handleAddClick = (columna) => {
    setFormColumna(columna);
    setFormVisible(true);
    setFormData({
      titulo: '',
      descripcion: '',
      usuario: '',
      colaboradores: ''
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const origen = Object.keys(tareas).find(col =>
      tareas[col].some(t => t.id === active.id)
    );
    const destino = over.id;

    if (origen && destino && origen !== destino) {
      const tareaMovida = tareas[origen].find(t => t.id === active.id);
      setTareas(prev => ({
        ...prev,
        [origen]: prev[origen].filter(t => t.id !== active.id),
        [destino]: [...prev[destino], tareaMovida],
      }));
    }
  };

  return {
    handleAddClick,
    handleDragEnd
  };
};
