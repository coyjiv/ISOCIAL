import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import PropTypes from 'prop-types';
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import gsap from 'gsap';
import styles from './save.module.scss';

const SavePostIcon = ({ saved, hovered }) => {
    const container = useRef(null);

    useGSAP(() => {
        if (saved) {
            gsap.timeline({ repeat: 0 }).to('.saved', {
                scale: 1.4,
                rotateY: 180,
                duration: 0.3,
            }).to('.saved', {
                scale: 1,
                duration: 0.3,
            });
        } else {
            gsap.timeline({ repeat: 0 }).to('.nonsaved', {
                scale: 1.4,
                rotateY: 180,
                duration: 0.3,
            }).to('.nonsaved', {
                scale: 1,
                duration: 0.3,
            });
        }

    }, { dependencies: [saved], scope: container })

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
        <span ref={container} className={styles.saveWrapper}>{saved ? <FaBookmark className="saved" /> : <FaRegBookmark className="nonsaved" />}</span>
    )
}

SavePostIcon.propTypes = {
    saved: PropTypes.bool,
    hovered: PropTypes.bool,
}

export default SavePostIcon