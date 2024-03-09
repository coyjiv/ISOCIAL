import { useRef } from 'react'
import { PiShareFatBold, PiShareFill } from 'react-icons/pi'
import PropTypes from 'prop-types'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import styles from './share.module.scss'

const SharePostIcon = ({ shared, hovered }) => {
    const container = useRef(null);

    useGSAP(() => {
        if (shared) {
            gsap.timeline({ repeat: 0 }).to('.shared', {
                scale: 1.4,
                rotateY: 180,
                duration: 0.3,
            }).to('.shared', {
                scale: 1,
                duration: 0.3,
            });
        } else {
            gsap.timeline({ repeat: 0 }).to('.nonshared', {
                scale: 1.4,
                rotateY: 0,
                duration: 0.3,
            }).to('.nonshared', {
                scale: 1,
                duration: 0.3,
            });
        }

    }, { dependencies: [shared], scope: container })

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
        <span ref={container} className={styles.shareWrapper}>{shared ? <PiShareFill className="shared" /> : <PiShareFatBold className='nonshared' style={{ width: '18px', height: '18px', translate: '0 1px' }} />}</span>
    )
}

SharePostIcon.propTypes = {
    shared: PropTypes.bool.isRequired,
    hovered: PropTypes.bool,
}
export default SharePostIcon