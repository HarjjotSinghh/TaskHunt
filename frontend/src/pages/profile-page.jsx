import { redirect } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { Avatar, Button, Card, Flex, Group, Text, UnstyledButton } from '@mantine/core';

const stats = [
    { value: '34K', label: 'Followers' },
    { value: '187', label: 'Follows' },
    { value: '1.6K', label: 'Posts' },
];


export default function ProfilePage() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    const items = stats.map((stat) => (
        <div key={stat.label}>
            <Text ta="center" fz="lg" fw={500}>
                {stat.value}
            </Text>
            <Text ta="center" fz="sm" c="dimmed" lh={1}>
                {stat.label}
            </Text>
        </div>
    ));

    useEffect(() => {
        if (!token) {
            window.location = "/";
            return redirect("/")
        }
        async function getProfile() {
            try {
                setLoading(true)
                await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/profile`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }).then((res) => {
                    setUserData(res)
                }).catch((err) => {
                    if (err.status === 401) {
                        return <Text size='lg' ta={"center"}>You are unauthorized.</Text>
                    }
                    console.error(err)
                })
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        getProfile();
    }, [token])
    return (
        <div>
            {userData.status === 200 && userData.data ?
                <Flex justify={"center"} align={"center"} miw={"100vw"}>
                    <Text size='lg' ta={"center"}>Profile</Text>
                    <Card withBorder padding="xl" w={"100%"} maw={"400px"} radius="md" className="bg-[var(--mantine-color-body)]">
                        <Card.Section
                            h={140}
                            style={{
                                backgroundImage:
                                    'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)',
                            }}
                        />
                        <Avatar
                            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
                            size={80}
                            radius={80}
                            mx="auto"
                            mt={-30}
                            className="border-2 border-white"
                        />
                        <Text ta="center" fz="lg" fw={500} mt="sm">
                            {userData.data.message}
                        </Text>
                        <Text ta="center" fz="sm" c="dimmed">
                            Fullstack engineer
                        </Text>
                        <Group mt="md" justify="center" gap={30}>
                            {items}
                        </Group>
                        <Button fullWidth radius="md" mt="xl" size="md" variant="default">
                            Follow
                        </Button>
                    </Card>
                </Flex> :
                <Text size='lg' ta={"center"}>You are unauthorized.</Text>}
        </div>
    )
}
