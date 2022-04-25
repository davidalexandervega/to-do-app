import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {createTodo} from '../features/todos/todoSlice'

const NewTodo = () => {
    
    const [formData, setFormData] = useState({
        title: '',
        notes: '',
        dueDate: '',
        list: ''
    });

    const lists = useSelector((state) => state.lists.lists);

    const dispatch = useDispatch()

    const { title, notes, dueDate, list} = formData;

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
            dueDate,
            list
        }

        dispatch(createTodo(todoData));

        setFormData((prevState) => ({
            ...prevState,
            title: '',
            notes: '',
            dueDate: '',
            list: ''
        }));
    };

    return (
        <div className='newTodo'>
            <div className='formHeader'>add a new to-do</div>
            <form className='todoForm'>
                <div className='formItem'>
                <label htmlFor='title'>title </label>
                <input type='text' className='formControl' id='title'
                name='title' value={title} onChange={onChange}/>
                </div>

                <div className='formItem'>
                <label htmlFor='notes'>notes </label>
                <input type='text' className='formControl' id='notes'
                name='notes' value={notes} onChange={onChange}/>
                </div>

                <div className='formItem'>
                <label htmlFor='dueDate'>due date </label>
                <input type='date' className='formControl' id='dueDate'
                name='dueDate' value={dueDate} onChange={onChange}/>
                </div>

                <div className='formItem'>
                    {lists.length > 0 ? (<>
                    <label htmlFor='list'>list </label>
                    <select id='list' name='list' onChange={onChange} value={list}>
                    <option value={''}>-</option>
                    {lists.map((list) => 
                    (<option key={list._id} value={list._id}>{list.title}</option>))}
                    </select></>)
                    : <></> }
                </div>

                <span onClick={() => onSubmit()} className='new confirmNewTodo'>
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