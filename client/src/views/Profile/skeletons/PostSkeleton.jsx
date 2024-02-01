import { Card, Stack, Skeleton, Avatar, CardMedia, CardContent, Typography } from "@mui/material"

const PostSkeleton = () => (<Card sx={{ p: 1 }}>
    <Stack direction="row" alignItems={'center'} gap={2}>
        <Skeleton animation="wave" variant="circular" width={40} height={40} sx={{ mb: 1 }} >
            <Avatar sx={{ width: 56, height: 56, marginRight: 2 }}>
            </Avatar>
        </Skeleton>
        <Skeleton animation="wave" variant="text" width={100} height={20} sx={{ mb: 1 }} />
    </Stack>
    <CardMedia
        sx={{ height: 140 }}
        component={Skeleton}
        animation="wave"
        variant="rectangular"
    />
    <CardContent>
        <Typography variant="h5">
            <Skeleton animation="wave" height={30} width="80%" />
        </Typography>
        <Typography variant="body2">
            <Skeleton animation="wave" height={20} width="90%" />
        </Typography>
        <Typography variant="body2">
            <Skeleton animation="wave" height={20} width="70%" />
        </Typography>
    </CardContent>
</Card>)

export { PostSkeleton }
