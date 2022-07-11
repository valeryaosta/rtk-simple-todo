import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function (_, {rejectWithValue}) {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=20`);

            if (!res.ok) {
                throw new Error('Server Error!')
            }

            const data = await res.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function (id, {rejectWithValue, dispatch}) {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE'
            });

            if (!res.ok) {
                throw new Error('Cannot delete the task. Server error!')
            }

            dispatch(removeTodo({id}))
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const toggleStatus = createAsyncThunk(
    'todos/toggleStatus',
    async function (id, {rejectWithValue, dispatch, getState}) {
        const todo = getState().todos.todos.find(todo => todo.id === id)

        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    completed: !todo.completed
                })
            });

            if (!res.ok) {
                throw new Error('Cannot toggle the task. Server error!')
            }

            dispatch(toggleTodoComplete({id}))

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async function (text, {rejectWithValue, dispatch}) {
        try {
            const todo = {
                userId: 1,
                title: text,
                completed: false
            }

            const res = await fetch(`https://jsonplaceholder.typicode.com/todos/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)

            })

            if (!res.ok) {
                throw new Error('Cannot add task. Server error!')
            }

            const data = await res.json();

            dispatch(addTodo(data))
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)


// helper for setting errors
const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload
}

const todoSLice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: null,
        error: null
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push(action.payload)
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
        },
        toggleTodoComplete(state, action) {
            const changedTodo = state.todos.find(todo => todo.id === action.payload.id);
            changedTodo.completed = !changedTodo.completed
        }
    },
    extraReducers: {
        [fetchTodos.pending]: (state, action) => {
            state.status = 'loading';
            state.error = null
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.todos = action.payload
        },
        [fetchTodos.rejected]: setError,
        [deleteTodo.rejected]: setError,
        [toggleStatus.rejected]: setError,
    }
})

// export actions, they created automatically
const {addTodo, removeTodo, toggleTodoComplete} = todoSLice.actions

// export reducer
export default todoSLice.reducer;