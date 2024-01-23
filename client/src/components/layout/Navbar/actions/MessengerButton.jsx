import { RiMessengerLine, RiMessengerFill } from "react-icons/ri";
import { useState, useRef } from 'react'
import { useOnClickOutside } from "usehooks-ts";
import classNames from "classnames";
import styles from '../navbar.module.scss'

const MessengerButton = () => {
    const ref = useRef(null)
    const [isMessengerOpen, setIsMessengerOpen] = useState(false)

    const handleClickOutside = () => {
        setIsMessengerOpen(false)
    }

    const handleClickInside = () => {
        setIsMessengerOpen(!isMessengerOpen)
    }

    useOnClickOutside(ref, handleClickOutside)

    const messengerButtonClasses = classNames({
        [styles.messengerButton]: true,
        [styles.messengerButtonActive]: isMessengerOpen
    })

    return (
        <button ref={ref} className={messengerButtonClasses} onClick={handleClickInside}>
            {isMessengerOpen ? <RiMessengerFill /> : <RiMessengerLine />}
        </button>
    )
}

export default MessengerButton