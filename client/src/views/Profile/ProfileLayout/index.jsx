import { useState } from 'react'

import PropTypes from 'prop-types'

import MediaUpload from "../../../components/modals/MediaUpload"
import AvatarMenu from "../AvatarMenu"
import ProfileTabs from "../ProfileTabs"
import { ProfileBackButton, WhiteButton } from '../../../components/buttons'
import FriendRequestButton from "../FriendRequestButton"
import { EditProfile } from "../../../components/modals/EditProfile"

import { useGetProfileByIdQuery } from '../../../store/services/profileService'


import { Box, Typography, Button, Stack, Container, Divider, useTheme } from '@mui/material'
import { useMediaQuery } from 'usehooks-ts';

import { placeholderAvatar } from "../../../data/placeholders"

import { MdPhotoCamera } from "react-icons/md"
import { NotificationSubscriptionBtn } from '../NotificationSubscriptionBtn'
import styles from '../profile.module.scss'
import { Link, useNavigate } from 'react-router-dom'


export const ProfileLayout = ({ id }) => {
    const theme = useTheme()
    const navigate = useNavigate()

    const { data: profile } = useGetProfileByIdQuery(id ?? localStorage.getItem('userId'));

    const isPersonalProfile = !id || id === localStorage.getItem('userId');


    const [isProfileEditOpen, setIsProfileEditOpen] = useState(false)
    const [isBannerUploadOpen, setIsBannerUploadOpen] = useState(false)
    const isMobile = useMediaQuery('(max-width: 480px)')

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


    return (
        <Box>
            <ProfileBackButton
                fullName={`${profile?.firstName} ${profile?.lastName}`}
                onClick={() => navigate(-1)}
            />
            <Container maxWidth={'lg'} >
                <Box sx={{ borderRadius: '10px', position: 'relative', overflow: 'clip', minHeight: '351px', backgroundColor: profile?.bannerUrl ? theme.palette.lightGrey : 'mediumpurple' }}>
                    {profile?.bannerUrl && <img src={profile?.bannerUrl} alt='user profile banner' style={{ width: '100%', height: '351px', objectFit: 'cover' }} />}
                    {isPersonalProfile && <WhiteButton onClick={onOpenBannerUpload} className={styles.buttonWhite}><MdPhotoCamera /> {!isMobile && (profile?.bannerUrl ? "Change banner" : "Upload banner")}</WhiteButton>}
                </Box>
                <Container sx={{ px: '5px' }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent={'start'} alignItems={'center'} spacing={2} sx={{ translate: '0px -30px', marginBottom: '-10px' }}>
                        <AvatarMenu avatarUrl={profile?.avatarsUrl?.[0] ?? placeholderAvatar(profile?.gender, profile?.firstName, profile?.lastName)} />
                        <Stack spacing={-1} style={{ marginTop: '30px' }}>
                            <Typography variant='h4' sx={{ fontWeight: 900, color: theme.palette.black, fontSize: 32 }}>
                                {profile?.firstName + " " + profile?.lastName}
                            </Typography>
                            <Typography variant='h5' sx={{ '& > a:hover': { textDecoration: 'underline' }, fontWeight: 500, color: theme.palette.greyColor, fontSize: 15, textAlign: isMobile ? 'center' : 'left' }} style={{ marginTop: '8px' }}>
                                <Link to={'?tab=Friends'}>
                                    friends: {profile?.friendsCount}
                                </Link>
                            </Typography>
                        </Stack>
                        <Stack direction={'row'} spacing={1} className={styles.profileActions}>
                            <FriendRequestButton isPersonalProfile={isPersonalProfile} profile={profile} id={id} />
                            <Button onClick={isPersonalProfile ? openProfileEdit : openMessenger} variant='outlined' sx={{ width: '180px', height: '36px', fontSize: 14 }}>{isPersonalProfile ? "Edit Profile" : "Send message"}</Button>
                            <NotificationSubscriptionBtn />
                        </Stack>
                    </Stack>
                    <Divider />
                </Container>
            </Container>
            <ProfileTabs />
            {profile && <EditProfile open={isProfileEditOpen} onClose={() => setIsProfileEditOpen(false)} profile={profile} />}
            {isPersonalProfile && <MediaUpload customOptions={{ aspect: 16 / 9, minWidth: 355, width: 355, height: 200, minHeight: 200, x: 25, y: 25, field: 'banner' }} open={isBannerUploadOpen} onClose={onCloseBannerUpload} modalTitle="Upload a new banner" />}
        </Box>
    )
}

ProfileLayout.propTypes = {
    id: PropTypes.string,
}