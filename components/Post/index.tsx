import { Card, CardActions, CardContent, CardMedia, IconButton, Tooltip, Typography } from "@mui/material";
import { Delete, Info, Share } from "@mui/icons-material"
import { useState } from "react";
import ReactionButton from "../ReactionButton";
import Link from "next/link";
import { RawPost } from "../interface/RawPost";
import { setScore } from "../backend";

const READ_MORE = {
    en: "Read more",
    ru: "Читать далее",
}

interface PostInterface extends RawPost { }

const Post = ({
    link,
    postName,
    postDescription,
    imageSrc,
    sourceName,
    lang,
    score,
}: PostInterface) => {
    const [reaction, setReaction] = useState(0);

    const text = postName + " " + postDescription;

    const handleReactionClick = async (reaction: number) => {
        await setScore(text, String(reaction))
            .then(r => r.status === 200 && setReaction(reaction));
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
                    <a>
                        <Link href={link}>
                            {(lang === "en") ? READ_MORE.en : READ_MORE.ru}
                        </Link>
                    </a>
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

export default Post;