import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, Text, Button, Title, Pagination, TagsInput, Badge } from '@mantine/core';
import Spinner from '../components/spinner';
import { IconCalendar, IconMoneybag, IconTag, IconTags, IconUserCircle } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export default function AllTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(6);
  const [selectedTags, setSelectedTags] = useState([])
  const [tagsData, setTagsData] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/tasks`);
        setTasks(response.data.tasks);
        const uniqueTags = response.data.tasks
          .reduce((acc, task) => [...acc, ...task.tags], [])
          .filter((tag, index, arr) => arr.indexOf(tag) === index);
        setTagsData(
          uniqueTags.map((tag) => ({
            value: tag,
            label: tag,
          }))
        );
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks
    .filter((task) =>
      selectedTags.length === 0 ||
      task.tags.some((tag) => selectedTags.includes(tag))
    )
    .slice(indexOfFirstTask, indexOfLastTask);

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  return (
    <Container size="lg">
      <Title order={1} align="center" mt={32} fw={800}>
        Available Tasks
      </Title>
      {loading && <Spinner />}
      <TagsInput
        mt={32}
        mb={32}
        label="Filter by Tags"
        placeholder="Pick a tag / Create a new tag"
        data={tagsData}
        size="lg"
        value={selectedTags}
        onChange={setSelectedTags}
        splitChars={[',']}
        maxDropdownHeight={200}
        allowNewTags
      />
      <Grid gutter={32} justify='start' align='stretch'>
        {loading ? (
          null
        ) : (
          currentTasks.map((task) => (
            <Grid.Col span={{ lg: 6 }} key={task._id}>
              <Card withBorder padding="xl" radius="md" h={"100%"} className="mb-md">
                <Link to={`/task/${task._id}`} className='hover:text-[var(--mantine-color-purple-5)] w-fit duration-200 transition-colors ease-in-out'>
                  <Text size="24px" fw={700}>
                    {task.name}
                  </Text>
                </Link>
                <Text lineClamp={4} size="lg" mt={20}>
                  {task.description}
                </Text>
                <div className='flex flex-wrap items-center justify-between gap-4 mt-4 mb-6'>
                  <Text size="lg" fw={600} className='inline-flex items-center gap-2 '>
                    <IconMoneybag className='size-8' />
                    <div className='w-full flex flex-col items-start'>
                      <Text inherit c={"dimmed"} fz={"md"} fw={300} mb={-4}>Bounty</Text> {task.bounty} INR
                    </div>
                  </Text>
                  <Text size="lg" fw={600} className='inline-flex items-center gap-2' >
                    <IconCalendar className='size-8' />
                    <div className='w-full flex flex-col items-start'>
                      <Text inherit c={"dimmed"} fz={"md"} fw={300} mb={-4}>Deadline</Text> {new Date(task.deadline).toLocaleDateString()}
                    </div>
                  </Text>
                  <Text size="lg" fw={600} className='inline-flex items-center gap-2'>
                    <IconUserCircle className='size-8' />
                    <div className='w-full flex flex-col items-start'>
                      <Text inherit c={"dimmed"} fz={"md"} fw={300} mb={-4}>Posted By</Text> {task.owner.name}
                    </div>
                  </Text>
                  {task.tags.length !== 0 &&
                    <div className="flex gap-2 items-start flex-col">
                      <Text size="lg" fw={600} className='inline-flex items-center'>
                        <IconTags className='size-10 mr-1' />
                        <div className='w-full flex flex-col items-start'>
                          <Title order={4}>Tags</Title>
                        </div>
                      </Text>
                      <div className='flex gap-2 flex-wrap'>
                        {task.tags.map((tag) => (
                          <Badge leftSection={<IconTag className='size-4' />} key={tag} variant="light" color='gray' autoContrast fw={700} size='md'>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  }
                </div>
                <Button className='inline-flex items-center gap-2 mt-auto' fullWidth  size='lg' component="a" href={`/task/${task._id}`} variant="light">
                  Apply For Task
                </Button>
              </Card>
            </Grid.Col>
          ))
        )}
      </Grid>

      <Pagination
        total={(tasks.length / tasksPerPage) + 1}
        limit={tasksPerPage}
        page={currentPage}
        onChange={handlePageChange}
        withControls
        autoContrast
        size={"xl"}
        mt={24}
        className='flex justify-center items-center'
        onNextPage={window.scrollTo(0, 0, { behavior: 'smooth' })}
      />
    </Container>
  );
}
