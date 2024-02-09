import { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Container, Grid, Card, Text, Button } from '@mantine/core';

// export default function AllTasksPage() {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/tasks`);
//         setTasks(response.data.tasks);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, []);

//   return (
//     <Container size="xl">
//       <Text align="center" mt={5} mb={2} size="lg" weight={700}>
//         Available Tasks
//       </Text>
//       <Grid>
//         {loading ? (
//           <Text align="center" size="xl">
//             Loading...
//           </Text>
//         ) : (
//           tasks.map((task) => (
//             <Col span={12} sm={6} md={4} lg={3} key={task._id}>
//               <Card shadow="sm" padding="md" radius="md" className="mb-md">
//                 <Text size="sm" color="dimmed">
//                   {task.deadline}
//                 </Text>
//                 <Text size="lg" weight={700} mt={1}>
//                   {task.name}
//                 </Text>
//                 <Text size="sm" color="dimmed" mt={1}>
//                   {task.description}
//                 </Text>
//                 <Text size="sm" weight={700} mt={2}>
//                   Bounty: {task.bounty}
//                 </Text>
//                 <Button fullWidth mt={2} component="a" href={`/task/${task._id}`} variant="light">
//                   View Task
//                 </Button>
//               </Card>
//             </Col>
//           ))
//         )}
//       </Grid>
//     </Container>
//   );
// }

function TasksPage() {
    return <>Hello?</>
}
export default TasksPage 