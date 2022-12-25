import { Alert, Box, CircularProgress, Stack, Typography } from "@mui/material";
import { RawPost } from "../interface/RawPost";
import Post from "../Post";

const Posts = ({ posts, loading }: { posts: RawPost[], loading: boolean }) => {
    if (loading) return loadingScreen;

    if (posts.length === 0) return noPosts;

    return (
        <Stack
            spacing={3}
            sx={{ my: 2 }}
        >
            {
                posts.sort((a, b) => Number(b.score) - Number(a.score)).map((post) => (
                    <Post
                        key={post.link}
                        {...post}
                    />
                ))
            }
        </Stack>
    )
};

const loadingScreen = (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%", height: "50vh"
    }}>
        <CircularProgress />
    </Box>
)

const noPosts = (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%", height: "50vh"
    }}>
        <Alert severity="warning" sx={{ width: "100%" }}>
            No posts found
        </Alert>
    </Box>
)

export default Posts;