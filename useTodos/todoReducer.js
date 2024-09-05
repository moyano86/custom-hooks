export const todoReducer = (initialState, action) => {
  switch (action.type) {
    case '[TODO] Add Todo':
      //en el payload enviamos un todo completo 
      return [...initialState, action.payload]

    case '[TODO] Remove Todo':
      //.filter devuelve un nuevo array. En este caso enviamos solo el id en el payload, y filtramos para que devuelva todos los elementos de initialState que no tenga ese id
      return initialState.filter(todo => todo.id !== action.payload)

    case '[TODO] Toggle Todo':
      return initialState.map(todo => {
        if(todo.id === action.payload) {
          return {
            ...todo,
            done: !todo.done
          }
        }
        return todo;
      });
        
    default:
      return initialState;
  }

}