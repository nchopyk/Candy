import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {checkAuth} from './actions/user.js';
import Auth from './components/authorization/Auth';
import Home from './components/home/Home';


function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.user.isAuth);

    useEffect(() => {
        if (localStorage.getItem('token')){
            dispatch(checkAuth());
        }
    }, [dispatch]);
    return (
        <BrowserRouter>
            <div>
                <div>
                    {!isAuth ?
                        <Switch>
                            <Route path='/auth' component={Auth}/>
                            <Redirect to='/auth'/>
                        </Switch> :
                        <Switch>
                            <Route exact path={'/'} component={Home}/>
                            <Redirect to='/'/>
                        </Switch>
                    }
                </div>

            </div>
        </BrowserRouter>
    );
}

export default App;