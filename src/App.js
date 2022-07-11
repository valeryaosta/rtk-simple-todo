import './App.css';
import {useState} from "react";
import Todolist from "./components/Todolist";
import InputField from "./components/InputField";

function App() {
    const [todos, setTodos] = useState([])
    const [text, setText] = useState('')

    const addTodo = () => {
        if (text.trim().length) {
            setTodos([
                ...todos,
                {
                    id: new Date().toISOString(),
                    text,
                    completed: false
                }
            ])
        }
        setText('')
    }

    const toggleTodoComplete = (todoId) => {
        setTodos(
            todos.map(todo => {
                if (todo.id !== todoId) return todo;

                return {
                    ...todo,
                    completed: !todo.completed
                }
            })
        )
    }

    const removeTodo = (todoId) => {
        setTodos(todos.filter(t => t.id !== todoId))
    }

    return (
        <div className='App'>
            <InputField text={text} handleInput={setText} handleSubmit={addTodo}/>

            <Todolist todos={todos} toggleTodoComplete={toggleTodoComplete} removeTodo={removeTodo}/>
        </div>
    );
}

export default App;
