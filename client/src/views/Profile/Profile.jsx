import { useEffect } from 'react'
import { GrayButton } from '../../components/buttons/index'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserProfile } from '../../store/actions/profile'
import { LuChevronDown } from 'react-icons/lu'
import './profile.scss'
import ProfileTabs from './ProfileTabs'
import { Box, Typography, Skeleton, Button, Stack } from '@mui/material'
import { GoPlus } from "react-icons/go";

const Profile = () => {
  const profile = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const isLoading = false
  // const isPersonalProfile = useSelector(state => state.profile.isPersonalProfile)

  useEffect(() => {
    if (profile.firstName === '') {
      dispatch(fetchUserProfile())
    }
  }, [])

  return (
    <main>
      <Box className='profile-banner-wrapper'>
        {isLoading ? (
          <Skeleton variant='rectangular' width='100%' height='405px' />
        ) : (
          <Box className='profile-banner'>
            {profile.bannerUrl ? (
              <img src={profile.bannerUrl} alt='profile banner' />
            ) : null}
            <GrayButton>Add a cover</GrayButton>
          </Box>
        )}
        <Stack direction={'row'} className='profile-details'>
          {isLoading ? (
            <Skeleton variant='circular' sx={{
              minWidth: '168px',
            }} width='168px' height='168px' />
          ) : (
            <div className='profile-avatar'>
              {profile.avatarUrl ? (
                <img
                  className='avatar'
                  src={profile.avatarUrl}
                  alt='profile-avatar'
                />
              ) : null}
            </div>
          )}
          <Typography className='profile-name'>
            {profile.firstName + ' ' + profile.lastName}
          </Typography>
          <div className='profile-details-btn-wrapper'>
            <Button variant='contained' startIcon={<GoPlus />}>Add to friends</Button>
            <Button>Message</Button>
            <Button>
              <LuChevronDown />
            </Button>
          </div>
        </Stack>
        <div className='profile-details-tabs'>
          <ProfileTabs />
        </div>
      </Box>
    </main>
  )
}

export default Profile
