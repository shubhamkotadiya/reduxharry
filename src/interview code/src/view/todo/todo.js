import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Todo = () => {
    const [todoList, setTodoList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('notesTbl')) {
            let fetch = JSON.parse(localStorage.getItem('notesTbl'));
            let getData = getAllData(fetch, JSON.parse(localStorage.getItem('loginUser'))._id)
            setTodoList(getData)
        }
    }, [!todoList])

    const getAllData = (fetch, value) => fetch.filter(note =>
        note.uid === value || note.shareId.includes(value)
    );

    const logout = () => {
        localStorage.removeItem('loginUser');
        navigate('/')
    }

    const onDelete = (id) => {
        let fetch = JSON.parse(localStorage.getItem('notesTbl'));
        const newItem = fetch.filter(_ => _._id !== id);
        localStorage.setItem('notesTbl', JSON.stringify(newItem));
        setTodoList(newItem)
    }
    
    return (
        <div className="login_form_wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header set-content-item">
                                <h5>Todo List</h5>
                                <div>
                                    <button className='btn btn-primary' onClick={() => navigate('/add')}>Add Note</button>
                                    &nbsp;&nbsp;
                                    <button className='btn btn-danger' onClick={() => logout()}>Logout</button>
                                </div>
                            </div>
                            <div className="card-block">
                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                todoList.length ?
                                                    todoList.map((item, i) => {
                                                        return (
                                                            <tr>
                                                                <td>{item.title}</td>
                                                                <td>{item.description}</td>
                                                                <td>
                                                                    <button className='btn btn-success' onClick={() => navigate(`/edit?uid=${item._id}`)}>Edit</button>
                                                                    &nbsp;&nbsp;
                                                                    <button className='btn btn-danger' onClick={() => onDelete(item._id)}>Delete</button>
                                                                    &nbsp;&nbsp;
                                                                    <button className='btn btn-primary' onClick={() => navigate(`/share?sid=${item._id}`)}>Share</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                    :
                                                    <tr>
                                                        <td colSpan={3} className='text-center'>No data found</td>
                                                    </tr>
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Todo;