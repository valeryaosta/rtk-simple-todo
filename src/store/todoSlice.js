import {createSlice} from "@reduxjs/toolkit";

const todoSLice = createSlice({
    name: 'todos',
    initialState: {
        todos: []
    },
    reducers: {
        addTodo(state, action) {
            console.log('state', state);
            console.log('action', action);

            state.todos.push({
                id: new Date().toISOString(),
                text: action.payload.text,
                completed: false
            })
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
        },
        toggleTodoComplete(state, action) {
            const changedTodo = state.todos.find(todo => todo.id === action.payload.id);
            changedTodo.completed = !changedTodo.completed
        }
    }
})

// export actions, they created automatically
export const {addTodo, removeTodo, toggleTodoComplete} = todoSLice.actions

// export reducer
export default todoSLice.reducer;