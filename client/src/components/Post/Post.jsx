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
import {API_URL, instance} from "../../api/config.js";
import {Link} from "react-router-dom";


const Post = ({
                  postId,
                  authorId,
                  avatarUrl,
                  username,
                  creationDate,
                  textContent,
                  images,
                  likesCount,
                  commentsCount
              }) => {
    const loggedUser = localStorage.getItem('userId');
    const isPostOwner = parseInt(loggedUser) === authorId;

    const actionRef = useRef();
    const [isModalAction, setIsModalAction] = useState(false);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isModalAction && actionRef.current && !actionRef.current.contains(e.target)) {
                setIsModalAction(false);
            }
        }
        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);
    }, [actionRef, isModalAction]);


    const handleLikePost = async () =>{
        //TODO: Implement like logic
    }
    const handleDeletePost = async () => {
        await instance.delete(`${API_URL}/api/posts/${postId}`);
        // TODO: REMOVE FROM POSTS LIST
    }


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.user}>
                    <Link to={`/profile/${authorId}`}>
                        <img src={avatarUrl} alt="" className={styles.userImage}/>
                    </Link>
                    <div className={styles.userData}>
                        <Link to={`/profile/${authorId}`}>
                            <p className={styles.username}>{username}</p>
                        </Link>
                        <p className={styles.creationDate}>
                            {moment(creationDate).format('DD MMMM YYYY [р.]')}
                        </p>
                    </div>
                </div>
                {isPostOwner && <div ref={actionRef} className={styles.actions} onClick={() => setIsModalAction(true)}>
                    <img src={action} alt="action btn"/>
                    {isModalAction && <div className={styles.actionModal}>
                        <span>Edit</span>
                        <span onClick={() => handleDeletePost()}>Delete</span>
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
                    <p>{likesCount}</p>
                </div>
                <div className={styles.commentsCount}>
                    <span>{commentsCount}</span> <img src={comment} alt="comment icon"/>
                </div>
            </div>
            <div className={styles.reactions}>
                <div className={styles.raction} onClick={() => handleLikePost()}>
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
            <div className={styles.footer}>
                <div className={styles.comments}>

                </div>
                <div>
                    <input type="text" placeholder={"Comment..."} className={styles.commentInput}/>
                </div>
            </div>
        </div>
    );
};

Post.propTypes = {
    postId: PropTypes.number.isRequired,
    authorId: PropTypes.number.isRequired,
    likesCount: PropTypes.string.isRequired,
    commentsCount: PropTypes.number.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    creationDate: PropTypes.instanceOf(Date).isRequired,
    textContent: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Post;
