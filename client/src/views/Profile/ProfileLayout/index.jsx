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

import { userAvatar } from "../../../data/placeholders"

import { MdPhotoCamera } from "react-icons/md"
import { NotificationSubscriptionBtn } from '../NotificationSubscriptionBtn'
import styles from '../profile.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useGetChatIdQuery } from '../../../store/services/chatService'
import { useDispatch } from 'react-redux'
import { setPendingChat } from '../../../store/chatSlice'
import moment from 'moment'


export const ProfileLayout = ({ id }) => {
    const theme = useTheme()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { data: profile } = useGetProfileByIdQuery(id ?? localStorage.getItem('userId'));

    const isPersonalProfile = !id || id === localStorage.getItem('userId');
    const { data: chatId } = useGetChatIdQuery(id, { skip: isPersonalProfile })


    const [isProfileEditOpen, setIsProfileEditOpen] = useState(false)
    const [isBannerUploadOpen, setIsBannerUploadOpen] = useState(false)
    const isMobile = useMediaQuery('(max-width: 480px)')
    const isLargeMobile = useMediaQuery('(max-width: 600px)')

    const openMessenger = () => {
        if (chatId) {
            navigate(`/chats/${chatId}`)
        } else {
            dispatch(setPendingChat({
                receiverId: id,
                chatName: `${profile?.firstName} ${profile?.lastName}`,
                avatarUrl: userAvatar(profile),
                receiverStatus: profile?.activityStatus,
                messages: [],
            }))
            navigate('/chat')
        }
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
    const lastSeen = moment(profile?.lastSeen).fromNow();


    return (
        <Box>
            <ProfileBackButton
                onClick={() => navigate(-1)}
            />
            <Container maxWidth={'lg'} >
                <Box sx={{ borderRadius: '10px', position: 'relative', overflow: 'clip', minHeight: '351px', backgroundColor: profile?.bannerUrl ? theme.palette.lightGrey : 'mediumpurple' }}>
                    {profile?.bannerUrl && <img src={profile?.bannerUrl} alt='user profile banner' style={{ width: '100%', height: '351px', objectFit: 'cover' }} />}
                    {isPersonalProfile && <WhiteButton onClick={onOpenBannerUpload} className={styles.buttonWhite}><MdPhotoCamera /> {!isMobile && (profile?.bannerUrl ? "Change banner" : "Upload banner")}</WhiteButton>}
                </Box>
                <Container sx={{ px: '5px' }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} rowGap={{ xs: 0, sm: '40px', md: 0 }} flexWrap={{ sm: 'wrap', lg: 'nowrap' }} justifyContent={'start'} alignItems={'center'} spacing={2} sx={{ translate: '0px -30px', marginBottom: '-10px' }}>
                        <AvatarMenu avatarUrl={userAvatar(profile)} />
                        <Stack spacing={-1} style={{ marginTop: '30px' }}>
                            <Typography variant='h4' sx={{ fontWeight: 900, textAlign: { xs: 'center', sm: 'inherit' }, color: theme.palette.black, fontSize: 32 }}>
                                {profile?.firstName + " " + profile?.lastName}
                            </Typography>
                            <Typography variant='h5' sx={{ '& > a:hover': { textDecoration: 'underline' }, fontWeight: 500, color: theme.palette.greyColor, fontSize: 15, textAlign: (isMobile || isLargeMobile) ? 'center' : 'left' }} style={{ marginTop: '8px' }}>
                                <Link to={'?tab=Friends'}>
                                    friends: {profile?.friendsCount} | last seen {lastSeen}
                                </Link>
                            </Typography>
                        </Stack>
                        <Stack direction={'row'} marginTop={{ xs: 0, md: 30, lg: 0 }} spacing={1} className={styles.profileActions}>
                            <FriendRequestButton isPersonalProfile={isPersonalProfile} profile={profile} id={id} />
                            <Button onClick={isPersonalProfile ? openProfileEdit : openMessenger} variant='outlined' sx={{ width: '180px', height: '36px', fontSize: 14 }}>{isPersonalProfile ? "Edit Profile" : "Send message"}</Button>
                            {!isPersonalProfile && <NotificationSubscriptionBtn />}
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