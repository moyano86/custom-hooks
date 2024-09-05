import { useEffect, useReducer } from "react"
import { todoReducer } from "./todoReducer";

  //para que el valor de todos no esté vacío cuando se renderiza el componente, recuperamos lo que hayamos guardado anteriormente en el localStorage (parse intenta convertir strign en objeto)
  //y se lo pasamos como variable al useReducer. Si no había nada que recuperar, pasamos un array vacío.
  const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
  }

export const useTodos = () => {

  //con useReducer pasamos una acción usando la función dispatch y nos devuelve un todos. 
  //useReducer utiliza la función todoReducer y un estado inicial para saber qué hacer con la acción que le mandamos
  const [todos, dispatch] = useReducer(todoReducer, [], init);

  //el localStorage se usa para almacenar información de forma permanente en el navegador. Esta no viaja en las peticiones, a diferencia de las cookies
  //solo se pueden guardar strings en el localStorage. 
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));  
  }, [todos])
  

  const handleNewTodo = (todo) => {
    const action = {
      type: '[TODO] Add Todo', 
      payload: todo
    }

    dispatch(action);
  }

  const handleDeleteTodo = (id) => {
    //Por simplicidad, aquí no declaramos la action, la metemos directamente en el dispatch
    dispatch({
      type: '[TODO] Remove Todo', 
      payload: id
    });
  }

  const handleToggleTodo = (id) => {
    dispatch({
      type: '[TODO] Toggle Todo', 
      payload: id
    });
  }

  return {
    todos,
    todosCount: todos.length,
    pendingTodos: todos.filter(todo => !todo.done).length,
    handleDeleteTodo, 
    handleToggleTodo, 
    handleNewTodo
  }
}