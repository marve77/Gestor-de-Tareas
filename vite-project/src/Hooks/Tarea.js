import { useState } from 'react';

export const useTarea = () => {
    const [tareas, setTareas] = useState({
    Pendiente: [],
    'En Proceso': [],
    Completado: []
  });

  const [formVisible, setFormVisible] = useState(false);
  const [formColumna, setFormColumna] = useState('Pendiente');
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    usuario: '',
    colaboradores: ''
  });
  return{
    tareas,
    setTareas,
    formVisible,
    setFormVisible,
    formColumna,
    setFormColumna,
    formData,
    setFormData
  }
}