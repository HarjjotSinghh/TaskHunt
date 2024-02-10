import { Title, Text, Button, Container } from '@mantine/core';
import Dots from '../components/dots';
import classes from './index-page.module.css';
import { Link } from 'react-router-dom';

export default function IndexPage() {
    return (
        <Container className={classes.wrapper} size={1400}>
            <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
            <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
            <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
            <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

            <div className={classes.inner}>
                <Title className="text-center">
                    Industry experience, now only a {' '}
                    <span className="text-[var(--mantine-color-purple-5)]">
                        few clicks
                    </span>{' '}
                    away.
                </Title>

                <Container mt={12} p={0} size={600}>
                    <Text size="lg" c="dimmed" className={classes.description}>
                    Gain real-world skills and experience by tackling challenges posted by various industy level businesses and organizations.
                    </Text>
                </Container>

                <div className="flex justify-center items-center mt-6 gap-4">
                    <Link to="/login">
                        <Button className={classes.control} size="md" variant="light" color="gray">
                            Get Started
                        </Button>
                    </Link>
                    <Link to={"/tasks"}>
                        <Button variant='filled' className={classes.control} size="md">
                            Browse Tasks
                        </Button>
                    </Link>
                </div>
            </div>
        </Container>
    );
}