import { TextInput, Button, Anchor, Text, PasswordInput, Title, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';
import classes from './register-page.module.css';
import { useState } from 'react';
import axios from "axios";
import Spinner from '../components/spinner';

export default function RegisterPage() {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const form = useForm({
        initialValues: {
            name: '',
            username: '',
            email: '',
            password: '',
        },

        validate: {
            name: (value) => (value.length > 1 ? null : 'Enter your name'),
            username: (value) => (value.length >= 3 && value.length < 20 ? null : 'Username must be at least 3 and at most 20 characters'),
            email: (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Enter a valid email'),
            password: (value) => (value.length > 8 ? null : 'Password should include at least 8 characters'),
        },

    });

    const handleNewUser = form.onSubmit(
        async (values) => {
            try {
                setLoading(true)
                await axios.post(`${import.meta.env.VITE_BACKEND_URI}/auth/register`, values).then(
                    setMessage("Successfully registed. You can now login.")
                ).catch((error) => { console.error(error); setMessage(error.message) })
            } catch (error) {
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
                    Create a new account 
                </Title>
                <form onReset={form.onReset} onSubmit={handleNewUser}>

                    <TextInput withAsterisk={!form.isValid("name")} label="Full Name" placeholder="Your Name" {...form.getInputProps('name')} size="md" />
                    <TextInput withAsterisk={!form.isValid("username")} label="Username" placeholder="Your password" mt="md" size="md" {...form.getInputProps('username', { type: "input" })} />
                    <TextInput withAsterisk={!form.isValid("email")} label="Email Address" placeholder="your@email.com" mt="md" size="md" {...form.getInputProps('email', { type: "input" })} />
                    <PasswordInput withAsterisk={!form.isValid("password")} label="Password" placeholder="Your password" mt="md" size="md" {...form.getInputProps('password')} />

                    <Button disabled={loading} fullWidth mt="xl" size="md" variant='light' type='submit'>
                        Register
                    </Button>
                    {loading && <Spinner/>}
                    <Text size='lg' ta={"center"} opacity={0.9} mt={"md"}>
                        {message}
                    </Text>
                </form>

                <Text ta="center" mt="md">
                    Already have an account?{' '}
                    <Anchor component='a' href="/login" fw={700}>
                        Login
                    </Anchor>
                </Text>
            </Paper>
        </div>
    )
}