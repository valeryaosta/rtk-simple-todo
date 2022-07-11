import './App.css';
import {useEffect, useState} from "react";
import Todolist from "./components/Todolist";
import InputField from "./components/InputField";
import {useDispatch, useSelector} from "react-redux";
import {addNewTodo, fetchTodos} from "./store/todoSlice";

function App() {
    const [text, setText] = useState('')
    const {status, error} = useSelector(state => state.todos)
    const dispatch = useDispatch()

    const addTask = () => {
        if (text.trim().length) {
            dispatch(addNewTodo(text))
            setText('')
        }
    }

    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch])

    return (
        <div className='App'>
            <InputField text={text} handleInput={setText} handleSubmit={addTask}/>

            {status === 'loading' && <h2>Loading...</h2>}
            {error && <h2>An error occurred: {error}</h2>}

            <Todolist/>
        </div>
    );
}

export default App;
