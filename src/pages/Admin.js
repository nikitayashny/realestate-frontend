import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Container } from "react-bootstrap";
import { Context } from "../index";
import { USER_ROUTE } from "../utils/consts";
import { banUser, changeUser } from "../http/userAPI";

const Admin = observer(() => {

    const {user} = useContext(Context)
    const thisUserId = user.userId

    const ban = (event, id) => {
        event.preventDefault()
        event.stopPropagation()
       
        banUser(id)
        .then(data => {  
            user.setUsers(data);
        });
    };

    const change = (event, id) => {
        event.preventDefault()
        event.stopPropagation()
       
        changeUser(id)
        .then(data => {  
            user.setUsers(data);
        });
    };

    const sortedUsers = [...user.users].sort((a, b) => a.id - b.id);

    return (
        <Container className="mt-5">
            <h4 className="mb-4">Панель администратора</h4>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>Email</th>
                            <th>Номер телефона</th>
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
                            <td>{user.active ? 'Активный' : 'Неактивный'}</td>
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
