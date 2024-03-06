import PropTypes from 'prop-types'
import { FaXmark } from "react-icons/fa6";
import { deleteObject, ref, getStorage } from '@firebase/storage';
import styles from '../createPost.module.scss'

const Attachment = ({ url, onRemove }) => {
    const deleteAttachment = async () => {
        deleteObject(ref(getStorage(), url)).then(() => {
            onRemove(url)
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <div className={styles.attachmentWrapper}>
            <button onClick={deleteAttachment} className={styles.removeAttachmentButton}><FaXmark /></button>
            <img src={url} alt="post attachment" className={styles.attachmentImg} />
        </div>
    )
}

Attachment.propTypes = {
    url: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired
}

export default Attachment