//libs
import moment from "moment";
import PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";
//styles
import styles from './styles.module.scss'
//images
import action from './icons/action.svg'
import heart from './icons/heart.svg'
import comment from './icons/comment.svg'
import commentIcon from './icons/commentIcon.svg'
import likeIcon from './icons/likeIcon.svg'
import repost from './icons/repost.svg'


const Post = ({postId, authorId,avatarUrl, username,creationDate,textContent,images}) => {
    const loggedUser = localStorage.getItem('userId');
    const isPostOwner = parseInt(loggedUser) === authorId;

    const actionRef = useRef();
    const [isModalAction, setIsModalAction] = useState(false);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isModalAction && actionRef.current && !actionRef.current.contains(e.target)){
                setIsModalAction(false);
            }
        }
        document.addEventListener('click',handleClickOutside);

        return () => document.removeEventListener('click',handleClickOutside);
    }, [actionRef,isModalAction]);


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.user}>
                    <img src={avatarUrl} alt="" className={styles.userImage}/>
                    <div className={styles.userData}>
                        <p className={styles.username}>{username}</p>
                        <p className={styles.creationDate}>
                            {moment(creationDate).format('DD MMMM YYYY [р.]')}
                        </p>
                    </div>
                </div>
                {isPostOwner && <div ref={actionRef} className={styles.actions} onClick={() => setIsModalAction(true)}>
                    <img src={action} alt="action btn"/>
                    {isModalAction && <div className={styles.actionModal}>
                        <span>Edit</span>
                        <span>Delete</span>
                    </div>}
                </div>}
            </div>
            <div className={styles.content}>
                {!!textContent && <p className={styles.textContent}>{textContent}</p>}
                {!!images.length && (images.length === 1 ?
                    <img src={images[0]} alt="image" className={styles.image}/>
                    :
                    <div className={styles.images}>
                        <div className={styles.mainImageWrapper}>
                            <img src={images[0]} alt="image" className={styles.mainImage}/>
                        </div>
                        <div className={styles.rest}>
                            {images.slice(1).map((img, i) => (
                                <div className={styles.restImageWrapper} key={i}>
                                    <img src={img} alt="image" className={styles.restImage}/>
                                </div>
                            ))}
                        </div>
                    </div>)
                }
            </div>
            <div className={styles.stats}>
                <div className={styles.likes}>
                    <img src={heart} alt="icon"/>
                    <p>Світлана Ускова, Вячеслав Гмиря та ще 1</p>
                </div>
                <div className={styles.comments}>
                    <span>1</span> <img src={comment} alt="comment icon"/>
                </div>
            </div>
            <div className={styles.reactions}>
                <div className={styles.raction}>
                    <img src={likeIcon} alt="like"/>
                    <span>Like</span>
                </div>
                <div className={styles.raction}>
                    <img src={commentIcon} alt="like"/>
                    <span>Comment</span>
                </div>
                <div className={styles.raction}>
                    <img src={repost} alt="like"/>
                    <span>Share</span>
                </div>
            </div>
        </div>
    );
};

Post.propTypes = {
    postId: PropTypes.number.isRequired,
    authorId: PropTypes.number.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    creationDate: PropTypes.instanceOf(Date).isRequired,
    textContent: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Post;
