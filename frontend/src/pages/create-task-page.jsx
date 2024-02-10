import { useState, useEffect } from 'react';
import axios from 'axios';
import { TextInput, Button, Text, Title, Paper, Textarea, TagsInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import Spinner from '../components/spinner';

export default function CreateTaskPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [userData, setUserData] = useState({})
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState(null || [])
    
    const form = useForm({
        initialValues: {
            name: '',
            description: '',
            deadline: '',
            bounty: 0,
            tags: selectedTags
        },
        validate: {
            name: (value) => (value.length > 0 ? null : 'Enter a task name'),
            description: (value) => (value.length > 0 ? null : 'Enter a task description'),
            deadline: (value) => (value ? null : 'Enter a task deadline'),
            bounty: (value) => (value >= 0 ? null : 'Enter a valid bounty amount'),
            tags: (value) => (value.length > 1 ? null : 'Enter at least two tags'),
        },
    });

    useEffect(() => {
        async function getProfile() {
            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/profile`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUserData(response)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        async function getTags() {
            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/tasks/tags`);
                setTags(response)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        getTags();
        getProfile();
    }, []);


    const handleSubmit = form.onSubmit(async (values) => {
        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/tasks/create`, {
                ...values,
                tags: selectedTags,
                owner: userData.data.user._id,
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error creating task:', error);
            setMessage(`Something went wrong. Please try again. ${error.message}`);
        } finally {
            setLoading(false);
            form.reset()
        }
    });
    if (loading) {
        return (
            <Spinner />
        )
    }
    return (
        userData.status === 200 ? (
            <div className={"flex justify-center items-center w-full"}>
                <Paper className={"w-full max-w-[800px]"} radius={0} p={48}>
                    <Title order={1} className={""} ta="left" tt="capitalize" textWrap="balance" mt="md" mb={50}>
                        Create a new task
                    </Title>
                    <form onSubmit={handleSubmit}>
                        <TextInput withAsterisk={!form.isValid("name")} label="Task Title" placeholder="Enter the task title" {...form.getInputProps('name')} size="lg" />
                        <Textarea resize='vertical' withAsterisk={!form.isValid("description")} label="Task Description" placeholder="Enter the task description" mt="md" size="lg" {...form.getInputProps('description')} />
                        <TextInput size='lg' withAsterisk={!form.isValid("deadline")} label="Task Deadline" placeholder="Enter the task deadline" mt="md" type="datetime-local" {...form.getInputProps('deadline')} />
                        <TextInput size='lg' withAsterisk={!form.isValid("bounty")} label="Task Bounty" placeholder="Enter the task bounty" mt="md" type="number" {...form.getInputProps('bounty')} />
                        <TagsInput
                            label="Task Tags"
                            withAsterisk={!form.isValid("tags")}
                            placeholder="Pick a tag / Create a new tag"
                            data={tags.data.tags}
                            type='text'
                            size='lg'
                            mt="md"
                            onOptionSubmit={(value) => { setSelectedTags((prev) => [...prev, value]) }}
                            splitChars={[',']}
                            maxDropdownHeight={200}
                            {...form.getInputProps('tags')}
                        />
                        <Button disabled={loading} fullWidth mt="xl" size="lg" variant="light" type="submit">
                            Create Task
                        </Button>
                        <Text size="lg" ta="center" opacity={0.9} mt="md">
                            {message}
                        </Text>
                    </form>
                </Paper>
            </div>
        ) : (
            <Text size='lg' ta={"center"}>You are not logged in.</Text>
        )

    );
}
