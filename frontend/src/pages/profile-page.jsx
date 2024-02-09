import axios from 'axios';
import { useEffect, useState } from 'react'
import { Avatar, Button, Card, Flex, Group, Text, Title } from '@mantine/core';

export default function ProfilePage() {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
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
                        return <Text size='lg' ta={"center"}>You are not logged in.</Text>
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
    }, [])
    // if (!(localStorage.getItem('token'))) {
    //     return <Navigate to={"/login"} />
    // }
    if (loading) {
        return <Text ta={"center"} size='xl'>Loading...</Text>
    }
    return (
        <div>
            {userData.status === 200 && userData.data ?
                <Flex justify={"center"} direction={"column"} gap={"md"} py={"48"} align={"center"} px="lg">
                    {/* <Text size='lg' ta={"center"}>Profile</Text> */}
                    <Card withBorder padding="xl" w={"100%"} maw={"400px"} radius="md" className="bg-[var(--mantine-color-body)]">
                        <Card.Section
                            h={140}
                            w={"auto"}
                            style={{
                                backgroundImage:
                                    userData.data.user.backgroundImageURL ? `url(${userData.data.user.backgroundImageURL})` :
                                        'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)',
                            }}
                        />
                        <Avatar
                            src={userData.data.user.profilePictureURL ? userData.data.user.profilePictureURL : "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"}
                            size={80}
                            radius={80}
                            mx="auto"
                            mt={-30}
                            className="border-2 border-white"
                        />
                        <Text ta="center" fz="lg" fw={500} mt="sm">
                            {userData.data.user.name}
                        </Text>

                        <Text ta="center" fz="sm" c="dimmed">
                            @{userData.data.user.username}
                        </Text>
                        <Text ta="center" fz="md" fw={400} mt="sm">
                            {userData.data.user.bio || "User Bio"}
                        </Text>
                        <Group mt="md" justify="center" gap={30}>
                            <div>
                                <Text ta="center" fz="lg" fw={500}>
                                    {userData.data.user.tasks.length}
                                </Text>
                                <Text ta="center" fz="sm" c="dimmed" lh={1}>
                                    Tasks Listed
                                </Text>
                            </div>
                            <div>
                                <Text ta="center" fz="lg" fw={500}>
                                    {userData.data.user.applications.length}
                                </Text>
                                <Text ta="center" fz="sm" c="dimmed" lh={1}>
                                    Applications Submitted
                                </Text>
                            </div>
                        </Group>
                        <Button fullWidth radius="md" mt="xl" size="md" variant="light">
                            Edit Profile
                        </Button>
                    </Card>
                </Flex> :
                <Title order={2} fw={700} py={48} ta={"center"}>You are not logged in.</Title>}
        </div>
    )
}
