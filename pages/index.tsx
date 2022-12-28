import type { NextPage } from 'next'
import { Container, Typography } from '@mui/material';
import Posts from '../components/Posts';
import { DataProvider } from '../components/providers/DataProvider';
import useUserIsLoggedIn from '../components/utils/useUserIsLoggedIn';

const Home: NextPage = () => {
    useUserIsLoggedIn();
    return (
        <DataProvider>
            <Container
                maxWidth="sm"
            >
                <Typography sx={{ mt: 4 }} variant="h4" gutterBottom>
                    Home
                </Typography>
                <Posts />
            </Container>
        </DataProvider>
    );
}

export default Home;