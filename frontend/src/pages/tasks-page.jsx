import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, Text, Button, Title, Pagination } from '@mantine/core';
import { FaDollarSign, FaCalendarAlt, FaUser, FaRupeeSign } from 'react-icons/fa';
import Spinner from '../components/spinner';

export default function AllTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(6);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/tasks`);
        setTasks(response.data.tasks);
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
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  return (
    <Container size="xl">
      <Title order={1} align="center" mt={24} mb={48} fw={800}>
        Available Tasks
      </Title>
      {loading && <Spinner/>}
      <Grid gutter={32}>
        {loading ? (
          null
        ) : (
          currentTasks.map((task) => (
            <Grid.Col span={{ lg: 4 }} key={task._id}>
              <Card withBorder padding="xl" radius="md" className="mb-md">
                <Text size="28px" fw={700}>
                  {task.name}
                </Text>
                <Text lineClamp={3} size="xl" mt={20}>
                  {task.description}
                </Text>
                <div className='flex flex-col divide-y divide-purple-500/50'>
                  <Text size="xl" mt={20} fw={600} className='inline-flex items-center gap-2 '>
                    <FaRupeeSign className='size-5' />
                    <div className='w-full flex justify-between items-center gap-2'>
                      <Text inherit fw={400}>Bounty</Text> {task.bounty} INR
                    </div>
                  </Text>
                  <Text mt={6} size="xl" fw={600} className='inline-flex items-center gap-2' >
                    <FaCalendarAlt className='size-5' />
                    <div className='w-full flex justify-between items-center gap-2'>
                      <Text inherit fw={400}>Deadline</Text> {new Date(task.deadline).toLocaleDateString()}
                    </div>
                  </Text>
                  <Text mt={6} size="xl" fw={600} className='inline-flex items-center gap-2'>
                    <FaUser className='size-5' />
                    <div className='w-full flex justify-between items-center gap-2'>
                      <Text inherit fw={400}>Posted By</Text> {task.owner.name}
                    </div>
                  </Text>
                </div>
                <Button className='inline-flex items-center gap-2' fullWidth mt={26} size='lg' component="a" href={`/task/${task._id}`} variant="light">
                  View Task
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
      />
    </Container>
  );
}
