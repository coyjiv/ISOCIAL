import ProfileTabs from './ProfileTabs'
import { Box, Typography, Button, Stack, Container, Divider, Avatar, useTheme } from '@mui/material'
import { GoPlus } from "react-icons/go";
import { withLayout } from '../../hooks/withLayout'
import ProfileSkeleton from './skeletons/ProfileSkeleton'
import { useGetProfileByIdQuery } from '../../store/services/profileService'
import { useParams } from 'react-router-dom'
import AvatarMenu from './AvatarMenu';
import { DEFAULT_USER_AVATAR } from '../../data/placeholders';

const ProfilePage = () => {
  const { id } = useParams();
  const { data: profile, error, isLoading } = useGetProfileByIdQuery(id)
  console.log(id, error);
  const theme = useTheme()
  const isPersonalProfile = false
  const isFriend = false

  const profileLayout = (<>
    <Container maxWidth={'lg'} >
      <Box sx={{ borderRadius: '10px', overflow: 'clip', minHeight: '351px', backgroundColor: theme.palette.lightGrey }}>
        {profile?.bannerUrl && <img src={profile?.bannerUrl} alt='user profile banner' style={{ width: '100%', height: '351px', objectFit: 'cover' }} />}
      </Box>
      <Container sx={{ px: '5px' }}>
        <Stack direction={'row'} justifyContent={'start'} alignItems={'center'} spacing={2} sx={{ translate: '0px -30px', marginBottom: '-10px' }}>
          <AvatarMenu avatarUrl={profile?.avatarUrl ?? DEFAULT_USER_AVATAR} />
          <Stack spacing={-1} style={{ marginTop: '30px' }}>
            <Typography variant='h4' sx={{ fontWeight: 900, color: theme.palette.black, fontSize: 32 }}>
              {profile?.firstName + " " + profile?.lastName}
            </Typography>
            <Typography variant='h5' sx={{ fontWeight: 500, color: theme.palette.grey, fontSize: 15 }} style={{ marginTop: '8px' }}>
              friends : {profile?.friends?.length}
            </Typography>
          </Stack>
          <Stack direction={'row'} spacing={1} style={{ marginLeft: 'auto' }}>
            {!isPersonalProfile &&
              <Button variant='outlined' sx={{ width: '180px', height: '36px', fontSize: 14 }}>
                {isFriend ?
                  "Remove from friends" :
                  <>
                    <GoPlus /> Add Friend
                  </>
                }
              </Button>}
            <Button variant='outlined' sx={{ width: '180px', height: '36px', fontSize: 14 }}>{isPersonalProfile ? "Edit Profile" : "Send message"}</Button>
          </Stack>
        </Stack>
        <Divider />
      </Container>
    </Container>
    <ProfileTabs />
  </>)

  return (
    <main>
      {error ?? isLoading ? <ProfileSkeleton /> : profileLayout}
    </main>
  )
}

const Profile = withLayout(ProfilePage)
export default Profile
