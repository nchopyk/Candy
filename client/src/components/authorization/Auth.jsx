import React, {useState, useRef} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from '../utils/input/Input';
import {useDispatch, useSelector} from 'react-redux';
import {login, registration} from '../../actions/user';

const initialState = { username: '', login: '', password: '', confirmPassword: '' };

const Auth = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const formRef = useRef();
    const isLoading = useSelector((state) => state.app.loader);

    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [validPasswordInputs, setValidPasswordInputs] = useState(true);

    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formRef.current.reportValidity()) {
            return;
        }
        if (isSignup) {
            if (form.password === form.confirmPassword) {
                setValidPasswordInputs(true);
                dispatch(registration(form));
            } else {
                setValidPasswordInputs(false);
            }
        } else {
            dispatch(login(form));
        }
    };


    if (isLoading) {
        return <div>Загрузка...</div>;
    }


    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={6}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
                {!validPasswordInputs && <Typography color={'secondary'}>Password does not match</Typography>}
                <form className={classes.form} ref={formRef}>
                    <Grid container spacing={1}>
                        {isSignup && (
                            <Input name="username" label="username" handleChange={handleChange}
                                   autoFocus value={form.username} autoComplete={'off'}/>)}
                        <Input name="login" label="Username/Email Address" handleChange={handleChange} type="text"
                               value={form.login} autoComplete={'on'}/>
                        <Input name="password" label="Password" handleChange={handleChange} value={form.password}
                               type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>

                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange}
                                            value={form.confirmPassword} type="password"
                                            isValid={validPasswordInputs}/>}
                    </Grid>

                    <Button type="submit" onClick={handleSubmit} fullWidth
                            variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign in' : 'Don\'t have an account? Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;