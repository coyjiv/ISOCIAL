import { Box, Skeleton, Stack, Container, Divider, Grid } from '@mui/material'
import { PostSkeleton } from './PostSkeleton'

const ProfileSkeleton = () => (
    <>
        <Container maxWidth={'md'} sx={{ mb: 4 }}>
            <Skeleton variant='rounded' width={'full'} height={351} />
            <Container sx={{ px: '5px' }}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={2} sx={{ my: 2 }}>
                    <Skeleton variant='circular' width={176} height={176} />
                    <Stack spacing={-1} width={200}>
                        <Skeleton variant='text' width={'full'} height={50} />
                        <Skeleton variant='text' width={'50%'} height={50} />
                    </Stack>
                    <Stack direction={'row'} spacing={1} margin={'auto'}>
                        <Skeleton variant='rounded' width={180} height={36} />
                        <Skeleton variant='rounded' width={180} height={36} />
                    </Stack>
                </Stack>
                <Divider />
                <Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={1} sx={{ my: 2 }}>
                    <Skeleton variant='text' width={'32px'} height={35} />
                    <Skeleton variant='text' width={'82px'} height={35} />
                    <Skeleton variant='text' width={'38px'} height={35} />
                    <Skeleton variant='text' width={'63px'} height={35} />
                    <Skeleton variant='text' width={'60px'} height={35} />
                    <Skeleton variant='text' width={'60px'} height={35} />
                    <Skeleton variant='rounded' width={'48px'} height={36} style={{ marginLeft: 'auto' }} />
                </Stack>
            </Container>
        </Container>
        <Box sx={{ backgroundColor: (theme) => theme.palette.wash }}>
            <Container maxWidth={'md'} sx={{ p: 2 }}>
                <Grid container spacing={4} >
                    <Grid item xs={12} sm={6} md={5}>
                        <Skeleton variant='rounded' width={'full'} height={332} />
                        <Skeleton variant='rounded' sx={{ mt: 1 }} width={'full'} height={421} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={7}>
                        <Stack spacing={2} sx={{ mt: 2 }}>
                            <PostSkeleton />
                            <PostSkeleton />
                            <PostSkeleton />
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </>
)

export default ProfileSkeleton
