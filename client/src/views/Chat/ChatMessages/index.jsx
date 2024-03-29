import { useState } from "react"
import styles from './chatMessages.module.scss'

const ChatMessages = () => {
    const [messages, setMessages] = useState([])
    return (
        <div className={styles.messagesWrapper}>
            {messages.length === 0 ?
                <p className={styles.empty}>Start by writing a message</p> :
                messages.map((message, index) => (
                    <div key={index}>
                        <p>{message.text}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default ChatMessages