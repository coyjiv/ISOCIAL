import { Avatar, Badge, Card, Typography } from "@mui/material"
import styled from "@emotion/styled";
import { useState, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import classNames from "classnames";
import { Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { ImExit } from "react-icons/im";
import { useGetProfileByIdQuery } from "../../../../store/services/profileService";
import { placeholderAvatar } from "../../../../data/placeholders";


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const StyledMenu = styled(Menu)(() => ({
    '& .MuiPaper-root': {
        minWidth: '320px',
        // minHeight: '636px',
        // translate: '-20px 10px',
        backgroundColor: `${({ theme }) => theme.palette.background.paper}`,
        color: `${({ theme }) => theme.palette.text.primary}`,
    }
}))

const StyledButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    transition-property: color, filter;
    transition: .2s ease-in-out;

    &.clicked {
        scale: 0.9;
        filter: brightness(0.8);
    }
`

const StyledCard = styled(Card)(({ theme }) => ({
    "&.MuiCard-root": {
        minHeight: '20px',
        minWidth: '80%',
        width: '50px',
        margin: '0px auto',
        translate: '0',
        display: 'flex',
        alignItems: 'center',
        padding: '8px 10px',
        marginTop: '10px',
        marginBottom: '20px',
        gap: '10px',
        boxShadow: `0 2px 12px ${theme.palette.shadow2}`,
        transitionProperty: 'background-color, filter, scale',
        transition: '0.3s ease-in-out',
        "&:hover": {
            background: 'rgba(0,0,0,0.05)',
            filter: 'brightness(0.8)'
        }
    }
}))

const StyledMenuItem = styled(MenuItem)(() => ({
    display: 'flex',
    gap: '10px',
    fontSize: '15px',
    marginTop: '10px',
    '& > div': {
        background: 'rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '7px',
        borderRadius: '20px',
        '& svg': {
            fontSize: '22px'
        }
    }
}))


const AvatarButton = () => {
    const ref = useRef(null)
    const { data: profile, isLoading } = useGetProfileByIdQuery(localStorage.getItem("userId"))
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
        setAnchorEl(ref?.current)
    }
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/login");
    }

    useOnClickOutside(ref, handleClickOutside)
    return (
        !isLoading &&
        <>
            <StyledButton ref={ref} className={buttonClasses} onClick={handleClickInside}>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar alt="User profile avatar" src={profile?.avatarsUrl?.[0] ?? placeholderAvatar(profile?.gender)} />
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
                        <Avatar alt="User profile avatar" src={profile?.avatarsUrl?.[0]} />
                        <Typography fontWeight='900'>{profile.firstName + " " + profile.lastName}</Typography>
                    </StyledCard>
                </Link>
                <StyledMenuItem onClick={handleClose}>
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