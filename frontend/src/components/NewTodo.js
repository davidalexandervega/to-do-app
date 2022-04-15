import {useState} from 'react';
import {useDispatch} from 'react-redux';

import {createTodo} from '../features/todos/todoSlice'

const NewTodo = () => {
    
    const [formData, setFormData] = useState({
        title: '',
        notes: '',
        dueDate: ''
    });

    const dispatch = useDispatch()

    const { title, notes, dueDate } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            // this refers to the form control as e.target,
            // as each has a 'name' and 'value' property:
            [e.target.name]: e.target.value
        }))
    };
    
    const onSubmit = (e) => {
        e.preventDefault();

        const todoData = {
            title,
            notes,
            dueDate
        }

        dispatch(createTodo(todoData));

        setFormData((prevState) => ({
            ...prevState,
            title: '',
            notes: '',
            dueDate: ''
        }))
    };

    return (
        <div className='newTodo'>
            <form onSubmit={onSubmit}>
                <label htmlFor='title'>title </label>
                <input type='text' className='formControl' id='title'
                name='title' value={title} onChange={onChange}/>

                <label htmlFor='notes'>notes </label>
                <input type='text' className='formControl' id='notes'
                name='notes' value={notes} onChange={onChange}/>

                <label htmlFor='dueDate'>due date </label>
                <input type='date' className='formControl' id='dueDate'
                name='dueDate' value={dueDate} onChange={onChange}/>

                <button type='submit' className='submitForm'>add</button>
            </form>
        </div>
    )
};

export default NewTodo;