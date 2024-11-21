import React, { useState, useEffect } from "react"
import logo from './logo.svg';
import './App.css';

 function LifeCycleDemo (){
   const [count, setCount] = useState(0);// a la constante count se le va a almacenar los datos obtenidos por setCount

   useEffect(() => {
     console.log("Montado");
     return () => {
       console.log("Desmontado");
     }
   },[]);

   useEffect(() => {
     console.log("Actualizado:", count);
   }, [count]);

   return (
     <div>
       <h1>Contador: {count}</h1>
      <button className="btn btn-success btn-sm me-2" onClick={() => setCount(count + 1)}>Incrementar numero</button>
      <button className="btn btn-success btn-sm me-2" onClick={() => setCount(count - 1)}>Decrementar numero</button>
     </div>
   );
 }

  //Componente TaskForm  "formulario"
 function TaksForm({taskText, setTaskText, addTask, isEditing, cancelEdit}) {//Aca le estamos diciendo que se ejecute la funcion 'taskText, setTaskText, addTask'
    return (
      <div className="input-group mb-3">
        <input className="form-control" 
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)} //El 'onChange'se usa para que cada vez que ocurra un cambio, se active el 'setTaskText' y este a su vez mande los cambios a  'TaksForm (linea 19)' para que se guarden ahi, estos cambios son las tareas que se añaden.  
          placeholder="Agregar tarea"> 
        </input>
        <button className= {`btn ${isEditing ? "btn-warning" : "btn-primary"}`} onClick={addTask}>{isEditing ? "Actualizar" : "Agregar"}</button>{/*Aca estamos diciendo que si estamos editando, (isEditing ?), nos vote el boton de Actualizar, de lo contrario mantenga el boton de Agregar */}
        {isEditing && (<button className="btn btn-secondary" onClick={cancelEdit}>Cancelar</button>)} 
      </div>
    );
  }  

  //componente TaskApp
  function TaskApp() {
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState("");//El 'setTaskText' es la caja de texto
    const [editing, setEditing] = useState(null);

    //Este codigo es para agregar las tareas y su boton esta en la linea 28.
    const addTask = () => {
    if(taskText.trim()){//El 'trim()' se usa para eliminar espacios al principio y al final de la cadena de texto para que quede limpio.
      if(editing) {
        setTasks(tasks.map ((task) => 
          task.id === editing ? {...task, text : taskText} : task
          )
        );
        setEditing(null);
      }
      else {
        setTasks([...tasks, {id: Date.now(), text: taskText, completed: false}]);//El 'id: Date.now()' es para que a cada tarea se le asigne un numero id diferente, esto, conrespecto a los milisegundos en que se agrega la tarea.
      }
      setTaskText("");
    }
    }

    //Este codigo es para eliminar las tareas.
    const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));//El boton para borrar las tareas esta en la linea 102.
    }

    //Este codigo es para editar las tareas 
    const updateTask = (id) =>{
      const taskToEdit = tasks.find((task) => task.id === id);//Aca estamos haciendo un abusqueda a una tarea 'task' con el id de la tarea que seleccionemos en la pagina.
      if(taskToEdit) {//Aca decimos que si encontramos la tarea 'taskToEdit', se guarde en el 'setTaskText' y lo encontrado en 'taskToEdit' lo mande al text.  
        setTaskText(taskToEdit.text);
        setEditing(id);
      }
    }

    //Este codigo es para cancelar la edicion de las tareas.
    const cancelEdit = () => {
      setTaskText("");
      setEditing(null);
    }

    //Este codigo es para asignar el check de las tareas.
    const tooggleComplete = (id) => {
    setTasks(
      tasks.map((task) => 
        task.id === id ? {...task, completed: !task.completed } : task
      )
    )
    }

    return (
    //Este div se creo porque al poner 'function TaksForm()' en la linea 19, todo el codigo se transformo en un componente, por lo que ya no se renderizaba y al llamarlo con el div asi '<TaksForm />', podemos usar dicho codigo de la linea 19 cuantas veces queramos sin necesidad de reescribirlo.
    <div className="container mt-4">
      <h1 className="text-center mb-4">Gestor de tareas</h1>
      <LifeCycleDemo></LifeCycleDemo>
      <TaksForm taskText={taskText} setTaskText={setTaskText} addTask = {addTask} isEditing = {Boolean(editing)} cancelEdit = {cancelEdit}/>
      <table className="table table-striped table-borderes">
        <thead className="table-light">
          <tr>
            <th>Nombre de la Tarea</th>
            <th className="text-center">Completada</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
        {
          tasks.map((task) => ( //Esto es para renderizar lo construido en la linea 40 y se muestre.
            <tr key={task.id}>
              <td className={task.completed ? "text-decoration-line-through" : ""}>{/*Aca le estamos preguntando que si la tarea esta completada (task.completed ?), poner una linea que la atraviese, de lo contrario (:) dejarlo en blanco("")*/}
                {task.text} 
              </td> 
              <td className="text-center">
                <input 
                type="checkbox"
                checked={task.completed}
                onChange={() => tooggleComplete(task.id)}>
                </input>
              </td>
              <td className="text-center">
                <button className="btn btn-success btn-sm me-2"
                 onClick={() => updateTask(task.id, task.text)}>Editar</button>
                <button class="btn btn-danger btn-sm"
                onClick={() => removeTask(task.id)}>Eliminar</button>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
    )
  }
 

export default TaskApp;
