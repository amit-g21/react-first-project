import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/usercontent';
import { useNavigate } from 'react-router-dom';

export default function ToDoList() {

    const { user } = useContext(UserContext);


    const navigate = useNavigate()

    const [todos, setTodos] = useState([]);
    const [currentTodos, setCurrentTodos] = useState([]);
    const [valueOrg, setValueOrg] = useState('')


    const userlocal = JSON.parse(localStorage.getItem('onlineUser'));
    const userId = userlocal.id


    useEffect(() => {
        const fetchToDo = async () => {
            const data = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
            const Todos = await data.json()
            setCurrentTodos(Todos)

        }
        fetchToDo()

    }, [user])

    useEffect(() => {
        let sortArr = [...currentTodos]
        switch (valueOrg) {
            case 'id':
                sortArr.sort((todo, todo2) => {
                    return todo.id - todo2.id
                })
                break;

            case 'checked':
                sortArr.sort((todo, todo2) => {
                    return todo2.completed - todo.completed
                })
                break;


            case 'a-z':
                sortArr.sort((todo, todo2) => {
                    if (todo.title > todo2.title) {
                        return 1;
                    } else if (todo.title == todo2.title) {
                        return 0;
                    } else {
                        return -1;
                    }
                })
                break;

            case 'random':
                sortArr.sort(() => {
                    return Math.random() - 0.5
                })
                break;

        }

        setCurrentTodos(sortArr)
    }, [valueOrg])


    const handleChange = async (i) => {
        const newArr = [...currentTodos]
        console.log(newArr)
        newArr[i].completed = !newArr[i].completed
        setTodos(newArr)
    }

    return (
        <>
            <h1> welcome to your todos page</h1>
            <h4>organaize your tasks by:</h4>
            <select value={valueOrg} onChange={e => setValueOrg(e.target.value)} className="selectOp">
                <option value="">
                    please choose a option
                </option>

                <option value="id">
                    id
                </option>

                <option value="checked">
                    checked
                </option>

                <option value="a-z">
                    A-Z
                </option>

                <option value="random">
                    Random
                </option>
            </select>



            <div>
                {currentTodos.map((todo, i) => {
                    return (
                        <div key={todo.id}>
                            <input type="checkbox" defaultChecked={todo.completed} onChange={() => handleChange(i)} />
                            <label className="labelTodo">{todo.title}</label>
                        </div>
                    )
                })
                }
            </div>



        </>
    )
}