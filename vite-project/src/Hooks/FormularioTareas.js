import { useState } from 'react';

export const useFormularioTarea = (setTareas) => {
  const [formVisible, setFormVisible] = useState(false);
  const [formColumna, setFormColumna] = useState('');
  const [tareaEditada, setTareaEditada] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    usuario: '',
    colaboradores: ''
  });

  const abrirFormulario = (columna, tarea = null) => {
    setFormColumna(columna);
    setTareaEditada(tarea);
    setFormVisible(true);

    if (tarea) {
      setFormData({
        titulo: tarea.titulo || '',
        descripcion: tarea.descripcion || '',
        usuario: typeof tarea.usuario === 'string' ? tarea.usuario : (tarea.usuario ? String(tarea.usuario) : ''),
        colaboradores: Array.isArray(tarea.colaboradores) ? tarea.colaboradores.join(', ') : (tarea.colaboradores || '')
      });
    } else {
      setFormData({
        titulo: '',
        descripcion: '',
        usuario: '',
        colaboradores: ''
      });
    }
  };

  const cerrarFormulario = () => {
    setFormVisible(false);
    setTimeout(() => {
      setTareaEditada(null);
      setFormColumna('');
      setFormData({
        titulo: '',
        descripcion: '',
        usuario: '',
        colaboradores: ''
      });
    }, 0);
  };

  const handleFormChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (columna, nuevaTarea) => {
    setTareas(prev => {
      const nuevasTareas = tareaEditada
        ? prev[columna].map(t => {
            const match = String(t.id) === String(tareaEditada.id);
            console.log('Comparando:', t.id, tareaEditada.id, 'match:', match);
            // Siempre retorna un nuevo objeto para forzar el re-render
            return match ? { ...nuevaTarea } : { ...t };
          })
        : [...(prev[columna] || []), nuevaTarea];
      return {
        ...prev,
        [columna]: nuevasTareas
      };
    });


    cerrarFormulario();
  };

  return {
    formVisible,
    formColumna,
    tareaEditada,
    formData,
    abrirFormulario,
    cerrarFormulario,
    handleFormChange,
    handleFormSubmit
  };
};
