import PropTypes from "prop-types";
import { useRef } from "react";
import { FaRegComment, FaComment } from "react-icons/fa6";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import styles from './comment.module.scss';

const CommentPostIcon = ({ clicked, hovered }) => {
    const container = useRef(null);
    useGSAP(() => {
        if (clicked) {
            gsap.timeline({ repeat: 0 }).to('.comment', {
                scale: 1.4,
                rotateY: 180,
                duration: 0.3,
            }).to('.comment', {
                scale: 1,
                duration: 0.3,
            });
        } else {
            gsap.timeline({ repeat: 0 }).to('.noncomment', {
                scale: 1.4,
                rotateY: 180,
                duration: 0.3,
            }).to('.noncomment', {
                scale: 1,
                duration: 0.3,
            });
        }

    }, { dependencies: [clicked], scope: container })

    useGSAP(() => {
        if (hovered) {
            gsap.to(container.current, {
                scale: 1.2,
                duration: 0.3,
            });
        } else {
            gsap.to(container.current, {
                scale: 1,
                duration: 0.3,
            });
        }
    }, { dependencies: [hovered], scope: container })
    return (
        <span ref={container} className={styles.commentWrapper}>
            {clicked ? <FaComment className="comment" /> : <FaRegComment className="noncomment" />}
        </span>
    )
}

CommentPostIcon.propTypes = {
    clicked: PropTypes.bool,
    hovered: PropTypes.bool,
}

export default CommentPostIcon