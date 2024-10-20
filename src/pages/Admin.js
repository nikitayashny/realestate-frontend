import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Container } from "react-bootstrap";
import { Context } from "../index";
import { USER_ROUTE } from "../utils/consts";
import { banUser, changeUser, fetchUsers } from "../http/userAPI";

const Admin = observer(() => {
    const {user} = useContext(Context)
    const thisUserId = user.userId
    const [searchTerm, setSearchTerm] = useState("");

    const ban = (event, id) => {
        event.preventDefault()
        event.stopPropagation()
       
        banUser(id)
        .then(() => {
            fetchUsers().then(data => {
                user.setUsers(data)
            })  
        })
    };

    const change = (event, id) => {
        event.preventDefault()
        event.stopPropagation()
       
        changeUser(id)
        .then(() => {
            fetchUsers().then(data => {
                user.setUsers(data)
            })  
        })
    };

    const sortedUsers = [...user.users]
        .sort((a, b) => a.id - b.id)
        .filter(user => 
            user.login.toLowerCase().includes(searchTerm.toLowerCase()) || 
            user.phoneNumber.includes(searchTerm) ||
            (user.firstName + ' ' + user.lastName).toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <Container className="mt-5" style={{ minHeight: '77vh'}}>
            <h4 className="mb-4">Панель администратора</h4>
            <input
                type="text"
                placeholder="Поиск"
                className="form-control mb-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>                         
                            <th>Email</th>
                            <th>Номер телефона</th>
                            <th>Имя</th>
                            <th>Активность</th>
                            <th>Роль</th>
                            <th>Бан</th>
                            <th>Редактирование</th>
                            <th>Подробная информация</th>
                        </tr>
                    </thead>
                    <tbody>
                    {sortedUsers.map(user => (
                        <tr key={user.id}>                     
                            <td>{user.login}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.firstName + ' ' + user.lastName}</td>
                            <td style={{ color: user.active ? 'green' : 'red' }}>
                                {user.active ? 'Активный' : 'Неактивный'}
                            </td>
                            <td>{user.role} </td>
                            <td>         
                                {user.id !== thisUserId 
                                ?        
                                <button onClick={(event) => ban(event, user.id)} className="btn btn-danger btn-sm">Бан</button>
                                :
                                <></>
                                }   
                            </td>
                            <td>
                                {user.id !== thisUserId 
                                ?
                                    <button onClick={(event) => change(event, user.id)} className="btn btn-warning btn-sm">Изменить роль</button>  
                                :
                                    <></>
                                }                           
                            </td>
                            <td>
                                <a href={USER_ROUTE + '/' + user.id} className="btn btn-info btn-sm">
                                    Подробная информация
                                </a>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </Container>
    )
})

export default Admin;
