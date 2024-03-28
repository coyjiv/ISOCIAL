import {RiNotification2Fill, RiNotification2Line} from "react-icons/ri";
import {useState, useRef, useEffect} from 'react'
import {useOnClickOutside} from "usehooks-ts";
import classNames from "classnames";
import styles from '../navbar.module.scss'
import {useGetNotificationQuery} from "../../../../store/services/notification.js";
import NotificationList from "./NotificationList.jsx"
import {Menu, MenuItem, useTheme} from "@mui/material";
import styled from "@emotion/styled";

// const StyledMenu = styled(Menu)(() => ({
//     '& .MuiPaper-root': {
//         minWidth: '320px',
//         backgroundColor: `${({theme}) => theme.palette.background.paper}`,
//         color: `${({theme}) => theme.palette.text.primary}`,
//     }
// }))

const NotificationButton = () => {
    const [page, setPage] = useState(0)
    const [notifications, setNotifications] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    const {data, isLoading, isSuccess} = useGetNotificationQuery({
        recieverId: localStorage.getItem('userId'),
        page: page,
        quantity: 10
    })

    console.log(data, isLoading, isSuccess)


    const ref = useRef(null)
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)


    useEffect(() => {
        if (isSuccess && data?.content) {
            const uniqueNotifications = data.content.filter(newNotification => (
                !notifications.some(existingNotification => existingNotification.id === newNotification.id)
            ));
            console.log('unique', uniqueNotifications)
            if (uniqueNotifications.length > 0) {
                setNotifications(prevNotifications => [...prevNotifications, ...data.content]);
            }
        }
        console.log(notifications, 'useEffect')
    }, [isSuccess, data]);


    const handleClickOutside = () => {
        setIsNotificationsOpen(false)
        setAnchorEl(null);
    }

    const handleClickInside = () => {
        setIsNotificationsOpen(!isNotificationsOpen)
        setAnchorEl(ref?.current)
    }

    useOnClickOutside(ref, handleClickOutside)

    const messengerButtonClasses = classNames({
        [styles.messengerButton]: true,
        [styles.messengerButtonActive]: isNotificationsOpen
    })

    const fetchMoreData = () => {
        setPage(prevPage => prevPage + 1);
    };


    return (
        <>
            <button ref={ref} className={messengerButtonClasses} onClick={handleClickInside}>
                {isNotificationsOpen ? <RiNotification2Fill/> : <RiNotification2Line/>}
            </button>
            {isNotificationsOpen &&
                    <NotificationList data={notifications} fetchMoreData={fetchMoreData} hasNext={data.hasNext}/>
                // <StyledMenu
                //     id="notification"
                //     anchorEl={ref?.current}
                //     open={Boolean(anchorEl)}
                //     onClose={handleClickOutside}
                //     MenuListProps={{
                //         'aria-labelledby': 'basic-button',
                //     }}
                //
                // >
                //     <MenuItem>
                //             <NotificationList data={notifications} fetchMoreData={fetchMoreData} hasNext={data.hasNext}/>
                //     </MenuItem>
                // </StyledMenu>
            }
        </>
    )
}

export default NotificationButton