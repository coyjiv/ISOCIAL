import { Dialog, Menu, MenuItem } from "@mui/material"
import PropTypes from 'prop-types'
import { useState } from "react";
import { useGetProfileByIdQuery, useUpdateProfileMutation } from "../../../store/services/profileService"
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDownloadLine } from "react-icons/ri";
import styles from './avatarView.module.scss'
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { placeholderAvatar } from "../../../data/placeholders";


const AvatarView = ({ onClose, open }) => {

    const { id } = useParams();

    const loggedUserId = localStorage.getItem('userId');


    const { data: profile, isLoading } = useGetProfileByIdQuery(id ?? loggedUserId);
    const [updateProfile] = useUpdateProfileMutation(loggedUserId);

    const [selectedAvatar, setAvatar] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleNext = () => {
        setAvatar(selectedAvatar + 1);
    }

    const handlePrev = () => {
        setAvatar(selectedAvatar - 1);
    }

    const handleClose = (e) => {
        if (e.target.classList.contains('MuiDialog-paper')) {
            onClose()
            setAvatar(0);

        }
    }

    const leftArrow = classNames(styles.buttons, styles.leftArrow)
    const rightArrow = classNames(styles.buttons, styles.rightArrow)

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = profile?.avatarsUrl[selectedAvatar];
        link.download = 'avatar.jpg';
        link.target = '_blank';
        link.click();
        link.remove();
    }


    const menuOpen = Boolean(anchorEl);
    const handleMouseOver = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        const newAvatars = profile?.avatarsUrl.filter((_, index) => index !== selectedAvatar);
        updateProfile({ body: JSON.stringify({ avatarsUrl: newAvatars }), id: loggedUserId });
        deleteObject(ref(getStorage(), profile?.avatarsUrl[selectedAvatar]));
        handleCloseMenu();
        setAvatar(Math.abs(selectedAvatar - 1));
    }

    const handleSetAsMain = () => {
        const newAvatars = profile?.avatarsUrl.filter((_, index) => index !== selectedAvatar);
        updateProfile({ body: JSON.stringify({ avatarsUrl: [profile?.avatarsUrl[selectedAvatar], ...newAvatars] }), id: loggedUserId });
        handleCloseMenu();
    }

    return (
        <Dialog fullScreen fullWidth scroll="paper" sx={{
            '& .MuiDialog-paper': {
                padding: '0px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
            }
        }} onClick={handleClose} open={open}>
            {!isLoading && <div className={styles.avatarWrapper}>
                <img width={300} height={300} src={profile?.avatarsUrl[selectedAvatar] ?? placeholderAvatar(profile?.gender, profile?.firstName, profile?.lastName)} alt="avatar" />
            </div>}
            <button className={leftArrow} disabled={selectedAvatar === 0} onClick={handlePrev}><FaChevronLeft /></button>
            <button className={rightArrow} disabled={selectedAvatar === profile?.avatarsUrl.length - 1} onClick={handleNext}><FaChevronRight /></button>

            <svg width="0" height="0">
                <filter
                    id="ambilight"
                    width="300%"
                    height="300%"
                    x="-0.75"
                    y="-0.75"
                    colorInterpolationFilters="sRGB"
                >
                    <feOffset in="SourceGraphic" result="source-copy" />
                    <feColorMatrix
                        in="source-copy"
                        type="saturate"
                        values="3"
                        result="saturated-copy"
                    />
                    <feColorMatrix
                        in="saturated-copy"
                        type="matrix"
                        values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    33 33 33 101 -132"
                        result="bright-colors"
                    />
                    <feMorphology
                        in="bright-colors"
                        operator="dilate"
                        radius="10"
                        result="spread"
                    />
                    <feGaussianBlur
                        in="spread"
                        stdDeviation="30"
                        result="ambilight-light"
                    />
                    <feOffset in="SourceGraphic" result="source" />
                    <feComposite in="source" in2="ambilight-light" operator="over" />
                </filter>
            </svg>
            <div className={styles.options}>
                <RiDownloadLine onClick={handleDownload} />
                <BsThreeDotsVertical onClick={handleMouseOver} onMouseEnter={handleMouseOver} />
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleCloseMenu}
                // onMouseOut={handleCloseMenu}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Copy</MenuItem>
                {!id && profile?.avatarsUrl?.[selectedAvatar] && <MenuItem onClick={handleDelete}>Delete</MenuItem>}
                {!id && selectedAvatar !== 0 && <MenuItem onClick={handleSetAsMain}>Set as main</MenuItem>}
            </Menu>
        </Dialog>
    )
}

AvatarView.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
}

export default AvatarView