import { AddCircle, Favorite, HeartBroken } from "@mui/icons-material";
import { Collapse, IconButton, IconButtonProps, Stack } from "@mui/material";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { getColorScheme } from "@mui/system/cssVars/useCurrentColorScheme";
import { useState } from "react";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(45deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const ReactionIcon = ({ reaction, expanded }: { reaction: number, expanded: boolean }) => {
    if (expanded) {
        return <AddCircle />
    }
    switch (reaction) {
        case 1:
            return <Favorite sx={{ color: red[500] }} />
        case -1:
            return <HeartBroken sx={{ color: red[500] }} />
        default:
            return <AddCircle />
    }
}

const ReactionButton = ({ reaction, onReactionClick }: any) => {

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleReactionClick = (newReaction: number) => {
        if (newReaction != reaction) {
            onReactionClick(newReaction)
        }
        else {
            onReactionClick(0)
        }
        setExpanded(false);
    }

    const color = (a: boolean) => {
        if (a) return red[500]
        else return ""
    }

    return (
        <Stack
            direction="row"
            alignItems="center"
        >
            <ExpandMore expand={expanded} onClick={handleExpandClick}>
                <ReactionIcon reaction={reaction} expanded={expanded} />
            </ExpandMore>
            <Collapse in={expanded} timeout="auto" unmountOnExit orientation="horizontal">
                <Stack
                    direction="row"
                >
                    <IconButton onClick={() => handleReactionClick(1)}>
                        <Favorite sx={{ color: color(reaction == 1) }} />
                    </IconButton>
                    <IconButton onClick={() => handleReactionClick(-1)}>
                        <HeartBroken sx={{ color: color(reaction == -1) }} />
                    </IconButton>
                </Stack>
            </Collapse>
        </Stack>
    )
};

export default ReactionButton;