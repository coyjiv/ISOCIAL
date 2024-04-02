import PropTypes from 'prop-types'
import { AvatarGroup, Avatar } from '@mui/material'
import { userAvatar } from '../../../data/placeholders'
import { Link } from 'react-router-dom'

export const LikedUsers = ({ recentLikedUsers, likesCount }) => {
    return (
        <AvatarGroup total={likesCount}>
            {recentLikedUsers?.map((el, i) => <Link key={i} to={'/profile/' + el?.id}><Avatar sx={{ width: '40px', height: '40px' }} src={userAvatar(el)} /></Link>)}
        </AvatarGroup>
    )
}

LikedUsers.propTypes = {
    recentLikedUsers: PropTypes.array.isRequired,
    likesCount: PropTypes.number.isRequired,
}