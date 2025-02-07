import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Container } from "react-bootstrap";
import { Context } from "../index";
import { USER_ROUTE } from "../utils/consts";
import { banUser, changeUser, fetchUsers } from "../http/userAPI";

const Admin = observer(() => {
    const {user} = useContext(Context)
    const thisUserId = user.userId
    const thisUserRole = user.role
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
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
            (user.username).toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <div style={{minHeight: '100vh'}}>
        <Container className="mt-5 mb-5" style={{ background: "rgba(255,255,255,1)", borderRadius: "20px", padding: "20px"}}>
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
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td style={{ color: user.enabled ? 'green' : 'red' }}>
                                {user.enabled ? 'Активный' : 'Неактивный'}
                            </td>
                            <td>{user.role} </td>
                            <td>         
                                {user.id !== thisUserId && user.role !== 'SUPER_ADMIN' && (user.role !== thisUserRole)
                                ?        
                                <button onClick={(event) => ban(event, user.id)} className="btn btn-danger btn-sm">Бан</button>
                                :
                                <></>
                                }   
                            </td>
                            <td>
                                {user.id !== thisUserId && user.role !== 'SUPER_ADMIN' && (user.role !== thisUserRole)
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
        </div>
    )
})

export default Admin;
