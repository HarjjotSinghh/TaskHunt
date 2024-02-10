import { TextInput, Button, Anchor, Text, PasswordInput, Title, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';
import classes from './login-page.module.css';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState } from 'react';
import axios from 'axios';
import Spinner from '../components/spinner';

export default function LoginPage() {
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Enter a valid email'),
            password: (value) => (value.length > 8 ? null : 'Password should include at least 8 characters'),
        },

    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { dispatch } = useAuthContext();

    const handleLogin = form.onSubmit(
        async (values) => {
            try {
                setLoading(true)
                const data = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/auth/login`, values).then((res) => {
                    const newToken = res.data["token"];
                    const existingToken = localStorage.getItem("token");
                    if (existingToken) {
                        localStorage.removeItem("token");
                    }
                    localStorage.setItem("token", newToken);
                    dispatch({type:"LOGIN", payload: res.data})
                    window.location = "/"
                    return
                }
                ).catch((error) => { console.error(error); setMessage(error.message) })
                console.log(data)
                console.log(values)
            } catch (error) {
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    setMessage("Something went wrong. Please try again. " + error.message)
                }
                setMessage("Something went wrong. Please try again. " + error.message)
                console.error(error)
            } finally {
                setLoading(false)
                form.reset()
            }
        }
    )

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={48}>
                <Title order={1} className={classes.title} ta="left" tt={"capitalize"} textWrap='balance' mt="md" mb={50}>
                    Login to an existing account
                </Title>
                <form onReset={form.onReset} onSubmit={handleLogin}>

                    <TextInput label="Email Address" placeholder="your@email.com" {...form.getInputProps('email')} size="md" />
                    <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" {...form.getInputProps('password', { type: "input" })} />

                    <Button disabled={loading} fullWidth mt="xl" size="md" variant='light' type='submit'>
                        Login
                    </Button>
                    {loading && <Spinner/>}
                    <Text size='lg' ta={"center"} opacity={0.9} mt={"md"}>
                        {message}
                    </Text>
                </form>

                <Text ta="center" mt="md">
                    Don&apos;t have an account?{' '}
                    <Anchor component='a' href="/register" fw={700}>
                        Register
                    </Anchor>
                </Text>
            </Paper>
        </div>
    )
}