import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import PropTypes from "prop-types";
import { FaRegHeart, FaHeart } from "react-icons/fa6";

import styles from './like.module.scss'

const Like = ({ liked, hovered }) => {
    const container = useRef(null);

    useGSAP(() => {
        if (liked) {
            gsap.timeline({ repeat: 0 }).to('.liked', {
                scale: 1.4,
                rotateY: 180,
                duration: 0.3,
            }).to('.liked', {
                scale: 1,
                duration: 0.3,
            });
        } else {
            gsap.timeline({ repeat: 0 }).to('.nonliked', {
                scale: 1.4,
                rotateY: 180,
                duration: 0.3,
            }).to('.nonliked', {
                scale: 1,
                duration: 0.3,
            });
        }

    }, { dependencies: [liked], scope: container })

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
        <span ref={container} className={styles.likeWrapper}>{liked ? <FaHeart className="liked" style={{ color: 'red' }} /> : <FaRegHeart className="nonliked" />}</span>
    )
}

Like.propTypes = {
    liked: PropTypes.bool.isRequired,
    hovered: PropTypes.bool,
}

export default Like