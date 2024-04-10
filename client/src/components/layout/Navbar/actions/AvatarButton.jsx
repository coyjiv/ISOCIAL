import { Avatar, Typography } from "@mui/material"
import { useState, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import classNames from "classnames";
import { StyledButton, StyledBadge, StyledMenu, StyledMenuItem, StyledCard } from "./actions.styled";
import { Link, useNavigate } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { ImExit } from "react-icons/im";
import { useGetProfileByIdQuery } from "../../../../store/services/profileService";
import { placeholderAvatar } from "../../../../data/placeholders";

const AvatarButton = () => {
    const ref = useRef(null)
    const userId = localStorage.getItem('userId')
    const { data: profile, isLoading } = useGetProfileByIdQuery(userId, { skip: !userId })
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const navigate = useNavigate()

    const buttonClasses = classNames({
        'clicked': isProfileMenuOpen
    })

    const handleClickOutside = () => {
        setIsProfileMenuOpen(false)
    }

    const handleClickInside = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen)
        setAnchorEl(isProfileMenuOpen ? null : ref?.current)
    }
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("userId");
        sessionStorage.removeItem("postContent")
        navigate("/login");
    }

    const handleGoToSettings = () => {
        navigate("/settings");
    }

    useOnClickOutside(ref, handleClickOutside)

    const avatarSrc = profile === undefined ? '' : profile?.avatarsUrl?.[0] ?? placeholderAvatar(profile?.gender, profile?.firstName, profile?.lastName)

    return (
        (userId && !isLoading && profile !== undefined) &&
        <>
            <StyledButton ref={ref} className={buttonClasses} onClick={handleClickInside}>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar alt="User profile avatar" src={avatarSrc} />
                </StyledBadge>
            </StyledButton>
            <StyledMenu
                id="profile-menu"
                anchorEl={ref?.current}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Link to='/profile'>
                    <StyledCard>
                        <Avatar alt="User profile avatar" src={avatarSrc} />
                        <Typography fontWeight='900'>{profile?.firstName + " " + profile?.lastName}</Typography>
                    </StyledCard>
                </Link>
                <StyledMenuItem onClick={handleGoToSettings}>
                    <div><IoMdSettings /></div>
                    Settings</StyledMenuItem>
                <StyledMenuItem onClick={handleLogout}>
                    <div><ImExit /></div>
                    Logout</StyledMenuItem>
            </StyledMenu>
        </>
    )
}

export default AvatarButton