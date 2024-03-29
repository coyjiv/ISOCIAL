import { RiMessengerLine, RiMessengerFill } from "react-icons/ri";
// import { useState, useRef } from 'react'
// import { useOnClickOutside } from "usehooks-ts";
import classNames from "classnames";
import styles from '../navbar.module.scss'
import { useLocation } from "react-router-dom";

const MessengerButton = () => {
    // const ref = useRef(null)
    // const [isMessengerOpen, setIsMessengerOpen] = useState(false)

    const location = useLocation().pathname

    const isActive = location.includes('/chats') || location.includes('/chat')

    // const handleClickOutside = () => {
    //     setIsMessengerOpen(false)
    // }

    // const handleClickInside = () => {
    //     setIsMessengerOpen(!isMessengerOpen)
    // }

    // useOnClickOutside(ref, handleClickOutside)

    const messengerButtonClasses = classNames({
        [styles.messengerButton]: true,
        [styles.messengerButtonActive]: isActive
    })

    return (
        <button
            //  ref={ref}
            className={messengerButtonClasses}
        //    onClick={handleClickInside}
        >
            {isActive ? <RiMessengerFill /> : <RiMessengerLine />}
        </button>
    )
}

export default MessengerButton