import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Container } from "react-bootstrap";
import { Context } from "../index";

const Admin = observer(() => {

    const {user} = useContext(Context)

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
                    {user.users.map(user => (
                        <tr key={user.id}>
                            <td>{user.login}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.active ? 'Активный' : 'Неактивный'}</td>
                            <td>
                                {user.role}
                            </td>
                            <td>                  
                                <button className="btn btn-danger btn-sm">
                                    Бан
                                </button>
                            </td>
                            <td>
                                <a className="btn btn-warning btn-sm">
                                    Редактирование
                                </a>           
                            </td>
                            <td>
                                <a className="btn btn-info btn-sm">
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
