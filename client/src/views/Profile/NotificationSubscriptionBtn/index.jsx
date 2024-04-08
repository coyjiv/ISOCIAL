import { useState } from "react";
import { IconButton } from "../../../components/buttons";
import { Menu, MenuItem, ListItemIcon, ListItemText, Paper, MenuList } from "@mui/material";
import { FaBell, FaRegBell, FaBellSlash } from 'react-icons/fa6'
import { useSubscribeToUserMutation, useUnsubscribeFromUserMutation } from "../../../store/services/profileService";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const NotificationSubscriptionBtn = () => {
    const { id } = useParams();

    const isSubscribed = false

    const [subscribe] = useSubscribeToUserMutation()
    const [unsubscribe] = useUnsubscribeFromUserMutation()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSubscribe = () => {
        subscribe({ id }).then(() => {
            toast.success('You have subscribed to notifications')
            handleClose()
        })
    }

    const handleUnsubscribe = () => {
        unsubscribe({ id }).then(() => {
            toast.info('You have unsubscribed from notifications')
            handleClose()
        })
    }


    return (
        <>
            <IconButton id="notification-button"
                aria-controls={open ? 'notification-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                {!isSubscribed ? <FaRegBell /> : <FaBell />}
            </IconButton>
            <Menu
                id="notification-menu"
                anchorEl={anchorEl}
                open={open}

                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'notification-button',
                }}
            >
                <Paper sx={{ width: 320, maxWidth: '100%', boxShadow: '0', padding: 0 }}>
                    <MenuList sx={{ padding: 0 }}>
                        <MenuItem onClick={handleSubscribe}>
                            <ListItemIcon>
                                <FaBell />
                            </ListItemIcon>
                            <ListItemText>Receive notifications</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={handleUnsubscribe}>
                            <ListItemIcon>
                                <FaBellSlash />
                            </ListItemIcon>
                            <ListItemText>Mute notifications</ListItemText>
                        </MenuItem>
                    </MenuList>
                </Paper>
            </Menu>
        </>

    )
}