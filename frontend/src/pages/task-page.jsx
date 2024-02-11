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
    TextInput,
    Textarea,
    Button,
    Flex,
    Card
} from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import { AiFillClockCircle, AiOutlineInfoCircle, AiFillDollarCircle, AiFillTag, AiOutlineUser, AiOutlineForm } from 'react-icons/ai';
import { useForm } from "@mantine/form"
import Spinner from '../components/spinner';
import { IconCheck, IconCross, IconDetails, IconFile, IconForms, IconInfoCircle, IconLink, IconPaperBag, IconPaperclip, IconUser, IconUserCircle, IconX, IconXd } from '@tabler/icons-react';

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
    const [applications, setApplications] = useState([])

    const handleAcceptApplication = async (applicationId) => {
        try {
            setLoading(true)
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URI}/api/applications/update/${applicationId}`, {
                status: "selected"
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            // Update applications state to reflect the change
            setApplications(applications.map((app) => (app._id === applicationId ? { ...app, status: "selected" } : { ...app, status: "rejected" })));

            // Update task state to mark it as completed
            await axios.patch(`${import.meta.env.VITE_BACKEND_URI}/api/tasks/update/${task._id}`, {
                completed: true
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            // Show success message to the user
            setMessage("Application accepted and task marked as completed.");
        } catch (error) {
            console.error("Error accepting application:", error);
            setMessage("An error occurred. Please try again later.");
        } finally {
            setLoading(false)
        }
    };

    const handleRejectApplication = async (applicationId) => {
        try {
            setLoading(true)
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URI}/api/applications/update/${applicationId}`, {
                status: "rejected"
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            // Update applications state to reflect the change
            setApplications(applications.map((app) => (app._id === applicationId ? { ...app, status: "rejected" } : app)));

            // Show success message to the user
            setMessage("Application rejected.");
        } catch (error) {
            console.error("Error rejecting application:", error);
            setMessage("An error occurred. Please try again later.");
        } finally {
            setLoading(false)
        }
    };


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
                setApplications(response.data.applications);
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
                <Spinner />
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
                            <Text className='whitespace-pre-line break-words w-full' size="lg" weight={500}>
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

                    {task.tags && task.tags.length !== 0 &&
                        <>
                            <Divider />
                            <Flex justify="start" align="center" gap={"md"} direction={"row"}>
                                <Title order={3}>Tags</Title>
                            </Flex>
                            <div className="flex gap-2 items-start flex-col mb-1">
                                <div className='flex gap-2 flex-wrap'>
                                    {task.tags.map((tag) => (
                                        <Badge leftSection={<AiFillTag />} key={tag} variant="light" color='gray' autoContrast fw={700} size='lg'>
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </>
                    }
                    {userData && task.owner && userData.status === 200 && userData.data.user._id !== task.owner._id &&
                        <>
                            <Divider />
                            <Group mb={16} justify="start" align="center">
                                <Title order={3}>Apply For This Task</Title>
                            </Group>

                            <form className='flex justify-center items-center flex-col gap-4 w-full' onSubmit={form.onSubmit(handleSubmit)}>
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
                        </>
                    }
                    {userData && task.owner && userData.status === 200 && userData.data.user._id === task.owner._id && (
                        <>
                            <Divider />
                            <Group justify="start" align="center">
                                <Title order={3}>Applications Recieved</Title>
                            </Group>
                            {applications.length === 0 && <Text size="lg" ta={"left"}>No applications recieved on this task yet...</Text>}

                            <div className='flex justify-center items-stretch flex-col gap-8'>
                                {applications.map((application, index) => (
                                    <Card className='flex flex-col gap-4' key={application._id} withBorder padding="xl" radius="md" mb={4}>
                                        <Title className='inline-flex items-center gap-2' order={3}>
                                            <IconUserCircle className='size-6' /> <span className=''>{application.name}</span>
                                        </Title>
                                        {application.description && (
                                            <div className='flex justify-start items-start flex-col gap-1'>
                                                <Title className='inline-flex flex-row-reverse items-center gap-1' order={4}>
                                                    <IconInfoCircle className='size-5' />
                                                    Description
                                                </Title>
                                                <Text size="lg" className='whitespace-pre-wrap max-w-full break-words'>
                                                    {application.description}
                                                </Text>
                                            </div>
                                        )}
                                        {application.demoLink && (
                                            <div className='flex justify-start items-start flex-col gap-1'>
                                                <Title className='inline-flex flex-row-reverse items-center gap-1' order={4}>
                                                    <IconLink className='size-5' />
                                                    Demo Link
                                                </Title>
                                                <Link to={application.demoLink} className='text-base underline'>{application.demoLink}</Link>
                                            </div>
                                        )}
                                        <Group justify="end">
                                            {loading && <Spinner />}
                                            {/* Replace with API endpoint and status update logic */}
                                            {application.status === "pending" && (
                                                <>
                                                    <Button
                                                        variant={application.status === "pending" ? "light" : "outline"}
                                                        color='green'
                                                        disabled={application.status !== "pending"}
                                                        size='md'
                                                        leftSection={<IconCheck className='size-5' />}
                                                        onClick={() => handleAcceptApplication(application._id)}>
                                                        Accept
                                                    </Button>
                                                    <Button
                                                        variant="light"
                                                        color="red"
                                                        size='md'
                                                        hidden={application.status === "pending"}
                                                        leftSection={<IconX className='size-5' />}
                                                        onClick={() => handleRejectApplication(application._id)}
                                                    >
                                                        Reject
                                                    </Button>
                                                </>
                                            )}
                                            {application.status === "selected" && (
                                                <Badge variant='light' size="lg" color='green'>Application Selected</Badge>
                                            )}
                                            {application.status === "rejected" && (
                                                <Badge variant='light' size="lg" color='red'>Application Rejected</Badge>
                                            )}

                                        </Group>
                                    </Card>
                                ))}
                            </div>
                        </>
                    )}
                </Stack>
            )}
        </Container>
    );
}
