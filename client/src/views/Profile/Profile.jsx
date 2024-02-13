import { useState } from 'react'
import ProfileTabs from './ProfileTabs'
import { Box, Typography, Button, Stack, Container, Divider, useTheme } from '@mui/material'
import { GoPlus } from "react-icons/go";
import { withLayout } from '../../hooks/withLayout'
import ProfileSkeleton from './skeletons/ProfileSkeleton'
import { useGetProfileByIdQuery } from '../../store/services/profileService'
import { useParams } from 'react-router-dom'
import AvatarMenu from './AvatarMenu';
import { DEFAULT_USER_AVATAR } from '../../data/placeholders';
import { EditProfile } from '../../components/modals/EditProfile';
import { WhiteButton } from '../../components/buttons';
import { MdPhotoCamera } from "react-icons/md";
import styles from './profile.module.scss'
import MediaUpload from '../../components/modals/MediaUpload';
import { useMediaQuery } from 'usehooks-ts';

const ProfilePage = () => {
  const { id } = useParams();

  const isPersonalProfile = !id;

  const { data: profile, error, isLoading } = useGetProfileByIdQuery(id ?? localStorage.getItem('userId'));


  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false)
  const [isBannerUploadOpen, setIsBannerUploadOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 480px)')
  const theme = useTheme()
  const isFriend = false

  const openMessenger = () => {
    console.log('open messenger');
  }

  const openProfileEdit = () => {
    setIsProfileEditOpen(true)
  }

  const onCloseBannerUpload = () => {
    setIsBannerUploadOpen(false)
  }

  const onOpenBannerUpload = () => {
    setIsBannerUploadOpen(true)
  }

  const profileLayout = (<>
    <Container maxWidth={'lg'} >
      <Box sx={{ borderRadius: '10px', position: 'relative', overflow: 'clip', minHeight: '351px', backgroundColor: theme.palette.lightGrey }}>
        {profile?.bannerUrl && <img src={profile?.bannerUrl} alt='user profile banner' style={{ width: '100%', height: '351px', objectFit: 'cover' }} />}
        {isPersonalProfile && <WhiteButton onClick={onOpenBannerUpload} className={styles.buttonWhite}><MdPhotoCamera /> {!isMobile && "Change banner"}</WhiteButton>}
      </Box>
      <Container sx={{ px: '5px' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent={'start'} alignItems={'center'} spacing={2} sx={{ translate: '0px -30px', marginBottom: '-10px' }}>
          <AvatarMenu avatarUrl={profile?.avatarsUrl?.[0] ?? DEFAULT_USER_AVATAR} />
          <Stack spacing={-1} style={{ marginTop: '30px' }}>
            <Typography variant='h4' sx={{ fontWeight: 900, color: theme.palette.black, fontSize: 32 }}>
              {profile?.firstName + " " + profile?.lastName}
            </Typography>
            <Typography variant='h5' sx={{ fontWeight: 500, color: theme.palette.greyColor, fontSize: 15, textAlign: isMobile ? 'center' : 'left' }} style={{ marginTop: '8px' }}>
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
            <Button onClick={isPersonalProfile ? openProfileEdit : openMessenger} variant='outlined' sx={{ width: '180px', height: '36px', fontSize: 14 }}>{isPersonalProfile ? "Edit Profile" : "Send message"}</Button>
          </Stack>
        </Stack>
        <Divider />
      </Container>
    </Container>
    <ProfileTabs />
    {profile && <EditProfile open={isProfileEditOpen} onClose={() => setIsProfileEditOpen(false)} profile={profile} />}
    {isPersonalProfile && <MediaUpload customOptions={{ aspect: 16 / 9, minWidth: 355, width: 355, height: 200, minHeight: 200, x: 25, y: 25, field: 'banner' }} open={isBannerUploadOpen} onClose={onCloseBannerUpload} modalTitle="Upload a new banner" />}
  </>)

  return (
    <main>
      {error ?? isLoading ? <ProfileSkeleton /> : profileLayout}
    </main>
  )
}

const Profile = withLayout(ProfilePage)
export default Profile
