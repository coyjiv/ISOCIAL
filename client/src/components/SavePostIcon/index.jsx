import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import PropTypes from 'prop-types';
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import gsap from 'gsap';
import styles from './save.module.scss';

const SavePostIcon = ({ favorite, hovered }) => {
    const container = useRef(null);

    useGSAP(() => {
        if (favorite) {
            gsap.timeline({ repeat: 0 }).to('.favorite', {
                scale: 1.4,
                rotateY: 180,
                duration: 0.3,
            }).to('.favorite', {
                scale: 1,
                duration: 0.3,
            });
        } else {
            gsap.timeline({ repeat: 0 }).to('.nonfavorite', {
                scale: 1.4,
                rotateY: 180,
                duration: 0.3,
            }).to('.nonfavorite', {
                scale: 1,
                duration: 0.3,
            });
        }

    }, { dependencies: [favorite], scope: container })

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
        <span className={styles.saveWrapper}>{favorite ? <FaBookmark className="favorite" /> : <FaRegBookmark className="nonfavorite" />}</span>
    )
}

SavePostIcon.propTypes = {
    favorite: PropTypes.bool,
    hovered: PropTypes.bool,
}

export default SavePostIcon