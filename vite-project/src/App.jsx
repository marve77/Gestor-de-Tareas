import { DndContext } from '@dnd-kit/core';
import Columna from './components/Columna';
import FormularioTarea from './components/FormularioTarea';
import { useUsuario } from './Hooks/Usuario';
import { useTarea } from './Hooks/Tarea';
import { useFormularioTarea } from './Hooks/FormularioTareas';
import { useAccionesColumna } from './Hooks/AccionesColumna';
import './App.css';

function App() {
  const { tareas, setTareas } = useTarea();
  const { usuarios } = useUsuario();

  const {
    formVisible,
    formColumna,
    tareaEditada,
    abrirFormulario,
    cerrarFormulario,
    handleFormSubmit,
    formData,
    handleFormChange
  } = useFormularioTarea(setTareas);

  const { handleAddClick, handleDragEnd } = useAccionesColumna({
    abrirFormulario,
    tareas,
    setTareas
  });

  const handleEliminarTarea = (columnaId, tareaId) => {
    setTareas(prev => ({
      ...prev,
      [columnaId]: prev[columnaId].filter(t => t.id !== tareaId)
    }));
  };

  const onEditarTarea = (tarea) => {
    console.log('Editando tarea desde App:', tarea);
    abrirFormulario(tarea.columna, tarea);
  };

  return (
    <>
      <h1 className="titulo-kanban">Tablero de Tareas</h1>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="kanban-contenedor">
          {Object.keys(tareas).map(col => (
            <Columna
              key={col}
              id={col}
              titulo={col}
              tareas={tareas[col]}
              onAgregarTarea={() => abrirFormulario(col)}
              onEditarTarea={onEditarTarea}
              onDeleteTarea={handleEliminarTarea}
            />
          ))}
        </div>
      </DndContext>

      {formVisible && (
        <FormularioTarea
          tarea={tareaEditada}
          columna={formColumna}
          onSave={handleFormSubmit}
          onCancel={cerrarFormulario}
          formData={formData}
          handleFormChange={handleFormChange}
          usuarios={usuarios}
        />
      )}
    </>
  );
}

export default App;
