import type { NextPage } from 'next'
import { Container, Typography } from '@mui/material';
import Posts from '../components/Posts';
import { useEffect, useState } from 'react';
import { RawPost } from '../components/interface/RawPost';

const Home: NextPage = () => {
    const [posts, setPosts] = useState<RawPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch("/api/posts")
            .then((res) => res.json())
            .then((posts: RawPost[]) => {
                setPosts(posts);
            })
            .then(() => setLoading(false))
    }, [])


    return (<>
        <Container
            maxWidth="sm"
        >
            <Typography sx={{ mt: 4 }} variant="h4" gutterBottom>
                Home
            </Typography>
            <Posts posts={posts} loading={loading} />
        </Container>
    </>);
}

export default Home;