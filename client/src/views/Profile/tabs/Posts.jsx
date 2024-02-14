import { useState } from 'react';
import { Avatar, Box, Container, Divider, Grid, Input, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { AiFillHome } from "react-icons/ai";
import { useGetProfileByIdQuery } from '../../../store/services/profileService';
import { useParams } from 'react-router-dom'
import styles from '../profile.module.scss'
import CreatePostModal from '../../../components/modals/CreatePost';
import { placeholderAvatar } from '../../../data/placeholders';

const Posts = () => {
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const { data: profile, error, isLoading } = useGetProfileByIdQuery(id ?? localStorage.getItem('userId'));
  const { data: loggedUserProfile, isLoading: isLoggedUserLoading } = useGetProfileByIdQuery(localStorage.getItem('userId'))

  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false)
  const onClose = () => setIsCreatePostModalOpen(false)
  const triggerPostModal = () => setIsCreatePostModalOpen(true)

  return (
    profile &&
    <>
      <Box sx={{ backgroundColor: (theme) => theme.palette.wash }}>
        <Container maxWidth={'lg'} sx={{ p: 2 }}>
          <Grid container spacing={4} >
            <Grid item xs={12} sm={6} md={5}>
              <div className={styles.card}>
                <Typography fontWeight={900} fontSize={20}>About me</Typography>
                <Typography marginY={2}>{profile.bio}</Typography>
                <Divider />
                <Typography marginTop={2}><AiFillHome /> Lives in {profile.city}</Typography>
                <Typography marginTop={2}>Subscribers</Typography>
              </div>
              <div className={styles.card}>
                <div>
                  <Typography fontWeight={900} fontSize={20}>Photos</Typography>
                  <Link to={'?tab=Photos'}><Typography>View all</Typography></Link>
                </div>
                <div>


                </div>
              </div>
              <div className={styles.card}>
                <div>
                  <Typography fontWeight={900} fontSize={20}>Friends</Typography>
                  <Link to={'?tab=Friends'}><Typography>View all</Typography></Link>
                </div>

              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={7}>
              {!isLoggedUserLoading && <div className={styles.card}>
                <div onClick={triggerPostModal}>
                  <Stack width={'100%'} gap={2} direction={'row'}>
                    <Avatar src={loggedUserProfile.avatarsUrl[0] ?? placeholderAvatar(loggedUserProfile.gender)} sx={{ width: 40, height: 'auto' }} />
                    <Input sx={{ width: '100%', borderRadius: '50px', "MuiInput-input": { cursor: 'pointer' } }} disableUnderline placeholder={'What\'s on your mind?'} />
                  </Stack>
                </div>
              </div>}
            </Grid>
          </Grid>
        </Container>
      </Box>
      <CreatePostModal open={isCreatePostModalOpen} onClose={onClose} />
    </>
  )
}

export default Posts