import React from 'react';
import {useDispatch} from "react-redux";
import {deleteTodo, toggleStatus} from "../store/todoSlice";

const TodoItem = ({id, title, completed}) => {
    const dispatch = useDispatch();

    return (
        <li key={id}>
            <input type='checkbox' checked={completed}
                   onChange={() => dispatch(toggleStatus(id))}
            />
            <span>{title}</span>
            <span className='cross' onClick={() => dispatch(deleteTodo(id))}>&times;</span>
        </li>
    );
};

export default TodoItem;