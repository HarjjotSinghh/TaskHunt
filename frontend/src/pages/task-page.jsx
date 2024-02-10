import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Text,
    Title,
    Stack,
    Group,
    Avatar,
    Badge,
    Divider,
    Skeleton,
    TextInput,
    Textarea,
    Button,
    Flex
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import { AiFillClockCircle, AiOutlineInfoCircle, AiFillDollarCircle } from 'react-icons/ai';
import { useForm } from "@mantine/form"

export default function TaskPage() {
    const params = useParams();
    const [task, setTask] = useState({});
    const [loading, setLoading] = useState(true);
    const form = useForm({
        initialValues: {
            name: "",
            description: "",
            demoLink: "",
        },
        validate: {
            name: (value) => (value.length > 3 ? null : 'Enter your name'),
            description: (value) => (value.length > 100 && value.length < 1000 ? null : 'Description should be between 100 and 1000 characters'),
            demoLink: (value) => (/^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(value) ? null : 'Enter a valid URL.'),
        }
    });
    const [loadingApplication, setLoadingApplication] = useState(false);
    const [message, setMessage] = useState("")
    const [userData, setUserData] = useState({});

    const handleSubmit = async () => {
        try {
            setLoadingApplication(true);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/applications/create`, {
                ...form.values,
                applicant: userData.data.user._id,
                task: task._id
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessage("Successfully submitted application.")
            form.reset()
            // Handle successful application submission
        } catch (error) {
            console.error("Error submitting application:", error);

        } finally {
            setLoadingApplication(false);
        }
    };
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
                    // console.error(err)
                })
            } catch (error) {
                // console.error(error);
            } finally {
                setLoading(false);
            }
        }
        getProfile();
    }, [])

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/tasks/${params.taskID}`);
                setTask(response.data.task);
            } catch (error) {
                console.error('Error fetching task:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTask();
    }, [params]);

    return (
        <Container size="md">
            {loading ? (
                <Skeleton size="xl" />
            ) : (
                <Stack spacing="md">
                    <Title order={1} align="center" mt={24} mb={48} fw={800}>
                        {task.name}
                    </Title>
                    <Group justify="start" align="center">
                        <Badge leftSection={<AiFillDollarCircle />} color="teal" variant="light" size='lg'>Bounty {task.bounty} INR</Badge>
                        <Badge leftSection={<AiFillClockCircle />} size='lg' className='inline-flex flex-row' color="gray" variant="light">
                            Deadline {new Date(task.deadline).toLocaleDateString()}
                        </Badge>
                    </Group>
                    <Divider />
                    <Stack spacing="lg">
                        <Flex justify="start" direction={"column"} align="start" gap="md">
                            <Title order={3}>Description</Title>
                            <Text className='whitespace-pre-line text-wrap overflow-auto' size="lg" weight={500}>
                                {task.description}
                            </Text>
                        </Flex>
                        <Flex justify="start" align="start" direction={"column"} gap="md">
                            <Title order={3}>Posted By</Title>
                            <Flex align={"center"} gap={"sm"}>
                                <Avatar>{task.owner ? task.owner.name[0].toUpperCase() : ""}</Avatar>
                                <Text size="md">{task.owner ? task.owner.name : ""}</Text>
                            </Flex>
                        </Flex>
                    </Stack>
                    <Divider />
                    <Flex justify="start" align="start" gap={"md"} direction={"column"}>
                        <Title order={3}>Additional Info</Title>
                        <AiOutlineInfoCircle />
                    </Flex>
                    {/* Add additional info section based on task data */}
                    {/* {userData.data} */}
                    {userData && task.owner && userData.status === 200 && userData.data.user._id !== task.owner._id &&
                        <>
                            <Divider />
                            <Group mb={16} justify="start" align="center">
                                <Title order={3}>Apply For This Task</Title>
                            </Group>

                            <form className='flex justify-center items-center flex-col gap-4 w-full' onSubmit={form.onSubmit(handleSubmit)}>
                                {/* Render form fields using Mantine components */}
                                <TextInput size='md' label="Your Name" {...form.getInputProps("name")} w={"100%"} />
                                <Textarea size='md' resize='vertical' label="Description" {...form.getInputProps("description")} w={"100%"} />
                                <TextInput size='md' label="Demo Link" {...form.getInputProps("demoLink")} w={"100%"} />
                                <Button mt={16} size='md' fullWidth variant='light' type="submit" disabled={loadingApplication}>
                                    {loadingApplication ? "Submitting..." : "Submit Application"}
                                </Button>
                            </form>
                            <Text size='lg' ta={"center"}>
                                {message}
                            </Text>
                        </>}

                </Stack>

            )}
        </Container>
    );
}
