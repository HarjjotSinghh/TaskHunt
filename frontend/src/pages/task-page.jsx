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
    Skeleton
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import { AiFillClockCircle, AiOutlineInfoCircle, AiFillDollarCircle } from 'react-icons/ai';

export default function TaskPage() {
    const params = useParams();
    const [task, setTask] = useState({});
    const [loading, setLoading] = useState(true);

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
                        <Badge leftSection={<AiFillClockCircle />} size='lg' className='inline-flex flex-row' color="gray" variant="filled">
                            Deadline {new Date(task.deadline).toLocaleDateString()}
                        </Badge>
                    </Group>
                    <Divider />
                    <Stack spacing="lg">
                        <Group justify="start" align="center">
                            <Text size="md">Description</Text>
                            <Text className='whitespace-pre-line text-wrap overflow-auto' size="lg" weight={500}>
                                {task.description}
                            </Text>
                        </Group>
                        <Group justify="start" align="center">
                            <Text size="md">Posted By</Text>
                            <Group>
                                <Avatar>{task.owner.name[0].toUpperCase()}</Avatar>
                                <Text size="md">{task.owner.name}</Text>
                            </Group>
                        </Group>
                    </Stack>
                    <Divider />
                    <Group justify="start" align="center">
                        <Text size="md">Additional Info</Text>
                        <AiOutlineInfoCircle />
                    </Group>
                    {/* Add additional info section based on task data */}
                </Stack>
            )}
        </Container>
    );
}
