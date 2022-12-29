import { Card, CardActions, CardContent, CardMedia, IconButton, Tooltip, Typography } from "@mui/material";
import { Info } from "@mui/icons-material"
import { FC, useState } from "react";
import ReactionButton from "../ReactionButton";
import Link from "next/link";
import { RawPost } from "../interface/RawPost";
import { DataProviderInterface, WithData } from "../providers/DataProvider";
import preprocess from "../utils/Preprocess"
import { Score } from "../interface/Score";

const READ_MORE = {
    en: "Read more",
    ru: "Читать далее",
}

interface PostInterface extends RawPost { }

const Post: FC<PostInterface & DataProviderInterface> = ({
    link,
    postName,
    postDescription,
    imageSrc,
    sourceName,
    lang,
    score,
    reactToPost
}) => {
    const [reaction, setReaction] = useState(0);


    const handleReactionClick = async (reaction: number) => {
        const text = postName + " " + postDescription;

        const wordFreq = preprocess(text);
        const score = {
            like: Number(reaction == 1),
            dislike: Number(reaction == -1)
        } as Score;

        reactToPost(
            wordFreq,
            score
        ).then(() => setReaction(reaction))
    }

    return (
        <Card key={link}>
            {imageSrc && <CardMedia
                component="img"
                height="140"
                src={imageSrc}
            />}
            <CardContent>
                <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                >
                    {sourceName}
                </Typography>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        mb: 1.5,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                    }}>
                    {postName}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: 14,
                    }}
                >
                    <span
                        dangerouslySetInnerHTML={{ __html: postDescription || "" }}
                        style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "4",
                            WebkitBoxOrient: "vertical",

                        }}
                    ></span>
                </Typography>
                <br />
                <Typography
                    sx={{
                        fontSize: 14,
                    }}
                >
                    <Link href={link} legacyBehavior>
                        <a target="_blank" rel="noopener noreferrer">
                            {(lang === "en") ? READ_MORE.en : READ_MORE.ru}
                        </a>
                    </Link>
                </Typography>
            </CardContent>
            <CardActions>
                <ReactionButton
                    reaction={reaction}
                    onReactionClick={handleReactionClick}
                />
                <Tooltip
                    title={Number(score).toFixed(2)}
                    placement="top"
                >
                    <IconButton
                        sx={{ ml: "auto" }}
                    >
                        <Info />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card >
    );
}

export default WithData(Post);