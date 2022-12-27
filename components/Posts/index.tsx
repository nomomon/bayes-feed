import { Alert, Box, CircularProgress, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { RawPost } from "../interface/RawPost";
import Post from "../Post";
import { DataProviderInterface, WithData } from "../providers/DataProvider";

interface PostsProps {
    loading: boolean;
}

const Posts: FC<PostsProps & DataProviderInterface> = ({ posts, loading }) => {
    return (
        <Stack
            spacing={3}
            sx={{ my: 2 }}
        >
            {
                posts.map((post) => (
                    <Post
                        key={post.link}
                        {...post}
                    />
                ))
            }
            {
                posts.length === 0 && !loading && (
                    <Alert typeof="warning">
                        No posts found
                    </Alert>
                )
            }
            {
                loading && (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: "100%", height: "50vh"
                    }}>
                        <CircularProgress />
                    </Box>
                )
            }
        </Stack>
    )
};

export default WithData(Posts);