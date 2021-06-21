import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../actions/user';
import UserService from '../../service/UserService';

const Home = () => {
        const { isAuth, currentUser } = useSelector((state) => state.user);
        const isLoading = useSelector((state) => state.app.loader);
        const dispatch = useDispatch();
        const [users, setUsers] = useState([]);

        async function getUsers() {
            try {
                const response = await UserService.fetchUsers();
                setUsers(response.data);
            } catch (e) {
                console.log(e);
            }
        }

        if (isLoading) {
            return <div>Загрузка...</div>;
        }

        return (
            <div>
                {isAuth ?
                    <>
                        <p>Пользователь авторизован {currentUser.email}</p>
                        <p>{currentUser.isActivated ? 'Аккаунт подтвержден по почте' : 'Подтвердите аккаунт'}</p>

                        <button onClick={() => dispatch(logout())}>Выйти</button>
                    </> :
                    <Link to='/auth'>Пользователь не авторизован</Link>}
                <div>
                    <button onClick={getUsers}>Получить пользователей</button>
                </div>
                {users.map(user =>
                    <div key={user.email}>{user.email}</div>
                )}

            </div>
        );
    }
;

export default Home;
