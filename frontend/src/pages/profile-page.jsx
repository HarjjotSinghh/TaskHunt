import axios from 'axios';
import { useEffect, useState } from 'react'
import { Avatar, Badge, Button, Card, Flex, Group, Text, Title } from '@mantine/core';
import { MdAdd, MdAddCircleOutline, MdDeleteForever, MdEditDocument, MdModeEdit, MdOutlineAddCircle, MdOutlineNoteAdd } from "react-icons/md";
import { Link } from 'react-router-dom';
import Spinner from '../components/spinner';

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
    if (loading) {

        return (
            <Spinner />
        )
    }
    return (
        <div>
            {userData.status === 200 && userData.data ?

                <Flex justify={"center"} direction={"row"} wrap={"wrap"} gap={"xl"} py={"48"} align={"start"} px="lg">

                    {/* Make a grid here with 3 cards in it, User Card, Applications Card and Tasks Card with options to edit and delete the applcations and tasks. */}

                    <Card withBorder padding={"xl"} w={"100%"} maw={{ lg: "450px" }} radius="md" className="bg-[var(--mantine-color-body)]">
                        <Card.Section
                            h={160}
                            w={"fit"}
                            style={{
                                backgroundImage:
                                    userData.data.user.backgroundImageURL ? `url(${userData.data.user.backgroundImageURL})` :
                                        'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)',
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }}
                        />
                        <Avatar
                            src={userData.data.user.profilePictureURL ? userData.data.user.profilePictureURL : "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"}
                            size={100}
                            radius={100}
                            mx="auto"
                            mt={-50}
                            className="select-none"
                            draggable="false"
                        />
                        <Text ta="center" fz="xl" fw={800} mt="sm" lineClamp={1}>
                            {userData.data.user.name}
                        </Text>

                        <Text ta="center" fz="lg" c="dimmed">
                            @{userData.data.user.username}
                        </Text>
                        <Text ta="center" fz={"lg"} fw={400} mt="sm">
                            {userData.data.user.bio || "User Bio"}
                        </Text>
                        <Group mt="md" justify="center" gap={30}>
                            <div>
                                <Text ta="center" fz="xl" fw={500}>
                                    {userData.data.user.tasks.length}
                                </Text>
                                <Text ta="center" fz="md" c="dimmed" lh={1}>
                                    Tasks
                                </Text>
                            </div>
                            <div>
                                <Text ta="center" fz="xl" fw={500}>
                                    {userData.data.user.applications.length}
                                </Text>
                                <Text ta="center" fz="md" c="dimmed" lh={1}>
                                    Applications
                                </Text>
                            </div>
                        </Group>
                        <Button fullWidth radius="md" mt="xl" size="lg" variant="light">
                            Edit Profile
                        </Button>
                    </Card>
                    <Flex direction={"column"} gap={"xl"}>

                        <Card withBorder padding={"xl"} radius="md">
                            <Title order={2} ta="center" fw={800}>
                                Applications Submitted
                            </Title>
                            <ul className='mt-8 grid space-y-3 divide-y divide-purple-500/50'>
                                {userData.data.user.applications.map((application) => (
                                    <li key={application._id} className="">
                                        {/* {JSON.stringify(application)} */}
                                        <div className="flex justify-between sm:gap-16 gap-2 mt-3 sm:flex-row flex-col sm:items-center items-start">
                                            <div className="flex justify-start sm:items-center items-start gap-2 sm:flex-row flex-col">
                                                {/* Icon based on application status */}
                                                {application.status === "pending" && (
                                                    <Badge variant='light' size="md" color="orange" >
                                                        {application.status}
                                                    </Badge>
                                                )}
                                                {application.status === "selected" && (
                                                    <Badge variant='light' size="md" color="green" >
                                                        {application.status}
                                                    </Badge>
                                                )}
                                                {application.status === "rejected" && (
                                                    <Badge variant='light' size="md" color="red" >
                                                        {application.status}
                                                    </Badge>
                                                )}
                                                {/* Display application name, task name, and maybe owner name */}
                                                <Text maw={{ lg: "380px" }} lineClamp={2} size="lg" fw={600}>
                                                    Applied for <Link to={"/task/" + application.task._id} className="underline">{application.task.name}</Link> on {new Date(application.createdAt).toLocaleDateString()}
                                                </Text>
                                            </div>
                                            <div className="flex justify-start items-center gap-3">
                                                {/* Use inline styles for better responsiveness */}
                                                <Button
                                                    px={6}
                                                    variant="outline"
                                                    size="xs"
                                                    radius={"md"}

                                                >
                                                    <MdModeEdit className='size-4' />
                                                </Button>
                                                <Button
                                                    px={6}
                                                    variant="outline"
                                                    size="xs"
                                                    radius={"md"}
                                                    color="red"
                                                >
                                                    <MdDeleteForever className='size-4' />
                                                </Button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                                <li>
                                    <Link to={"/tasks"}>
                                        <Button leftSection={<MdAddCircleOutline className='size-6' />} fullWidth className='mt-8' size="lg" variant="light">
                                            Apply For Another Task
                                        </Button>
                                    </Link>
                                </li>
                            </ul>

                        </Card>

                        <Card withBorder padding={"xl"} radius="md">
                            <Title order={2} ta="center" fw={800}>
                                Tasks Listed
                            </Title>
                            <ul className="mt-8 grid space-y-3 divide-y divide-purple-500/50">
                                {userData.data.user.tasks.map((task) => (
                                    <li key={task._id} className="">
                                        <div className="flex justify-between sm:gap-16 gap-2 mt-3 sm:flex-row flex-col sm:items-center items-start">
                                            <div className="flex justify-start sm:items-center items-start gap-2 sm:flex-row flex-col">
                                                {/* Icon based on task status (replace with your logic) */}
                                                {task.completed ? (
                                                    <Badge variant='light' size="md" color="green" >
                                                        completed
                                                    </Badge>
                                                ) : (
                                                    <Badge variant='light' size="md" color="orange" >
                                                        pending
                                                    </Badge>
                                                )}

                                                <Text maw={{ lg: "350px" }} lineClamp={2} size="lg" fw={600}>
                                                    Listed <Link to={"/task/" + task._id} className='underline'>{task.name}</Link> on {new Date(task.createdAt).toLocaleDateString()}
                                                </Text>


                                            </div>
                                            <div className="flex justify-start items-center gap-3">
                                                {/* Use inline styles for better responsiveness */}
                                                <Link to={"/task/" + task._id}>
                                                    <Button
                                                        px={6}
                                                        variant="outline"
                                                        size="xs"
                                                        radius="md"
                                                    >
                                                        <MdEditDocument className="size-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    px={6}
                                                    variant="outline"
                                                    size="xs"
                                                    radius="md"
                                                >
                                                    <MdModeEdit className="size-4" />
                                                </Button>
                                                <Button
                                                    px={6}
                                                    variant="outline"
                                                    size="xs"
                                                    radius="md"
                                                    color="red"
                                                >
                                                    <MdDeleteForever className="size-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                                <li>
                                    <Link to={"/create-task"}>
                                        <Button leftSection={<MdAddCircleOutline className='size-6' />} fullWidth className='mt-8' size="lg" variant="light">
                                            Create A New Task
                                        </Button>
                                    </Link>
                                </li>
                            </ul>
                        </Card>
                    </Flex>

                </Flex> :
                <Title order={2} fw={700} py={48} ta={"center"}>You are not logged in.</Title>}
        </div>
    )
}
