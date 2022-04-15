import {useState} from 'react';
import {useDispatch} from 'react-redux';

import {createTodo} from '../features/todos/todoSlice'

import './NewTodo.scss'

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
    
    const onSubmit = () => {

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
        }));
    };

    return (
        <div className='newTodo'>
            <div className='newTodoHeader'><b>add a new to-do</b></div>
            <form className='todoForm'>
                <div className='formItem'>
                <label htmlFor='title'><b>title </b></label>
                <input type='text' className='formControl' id='title'
                name='title' value={title} onChange={onChange}/>
                </div>

                <div className='formItem'>
                <label htmlFor='notes'><b>notes </b></label>
                <input type='text' className='formControl' id='notes'
                name='notes' value={notes} onChange={onChange}/>
                </div>

                <div className='formItem'>
                <label htmlFor='dueDate'><b>due date </b></label>
                <input type='date' className='formControl' id='dueDate'
                name='dueDate' value={dueDate} onChange={onChange}/>
                </div>

                <span onClick={() => onSubmit()} className='submitTodo'>
                <svg width="16" height="16" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 12H12M16 12H12M12 12V8M12 12V16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                </span>
            </form>
        </div>
    )
};

export default NewTodo;