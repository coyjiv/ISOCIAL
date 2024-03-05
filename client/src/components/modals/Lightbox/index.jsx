import { Dialog } from "@mui/material";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { RiDownloadLine } from "react-icons/ri";
import styles from './lightbox.module.scss'; // Adjust the CSS module as needed
import classNames from "classnames";
import Spinner from "../../Spinner";

const Lightbox = ({ images, onClose, open }) => {
    const [selectedImage, setImage] = useState(0);

    const handleNext = () => setImage((prevImage) => Math.min(prevImage + 1, images.length - 1));
    const handlePrev = () => setImage((prevImage) => Math.max(prevImage - 1, 0));

    const handleClose = (e) => {
        if (e.target.classList.contains('MuiDialog-paper')) {
            onClose();
            setImage(0);
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = images[selectedImage];
        link.download = `image-${selectedImage}.jpg`; // You might want to adjust the naming
        link.target = '_blank';
        link.click();
        link.remove();
    };

    const leftArrow = classNames(styles.buttons, styles.leftArrow);
    const rightArrow = classNames(styles.buttons, styles.rightArrow);

    return (
        <Dialog fullScreen fullWidth scroll="paper" sx={{
            '& .MuiDialog-paper': {
                padding: '0px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
            }
        }} onClick={handleClose} open={open}>
            <div className={styles.imageWrapper}>
                <BeatyImage image={images[selectedImage]} />
            </div>
            <button className={leftArrow} disabled={selectedImage === 0} onClick={handlePrev}><FaChevronLeft /></button>
            <button className={rightArrow} disabled={selectedImage === images.length - 1} onClick={handleNext}><FaChevronRight /></button>
            <svg width="0" height="0">
                <filter
                    id="ambilight"
                    width="300%"
                    height="300%"
                    x="-0.75"
                    y="-0.75"
                    colorInterpolationFilters="sRGB"
                >
                    <feOffset in="SourceGraphic" result="source-copy" />
                    <feColorMatrix
                        in="source-copy"
                        type="saturate"
                        values="3"
                        result="saturated-copy"
                    />
                    <feColorMatrix
                        in="saturated-copy"
                        type="matrix"
                        values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    33 33 33 101 -132"
                        result="bright-colors"
                    />
                    <feMorphology
                        in="bright-colors"
                        operator="dilate"
                        radius="10"
                        result="spread"
                    />
                    <feGaussianBlur
                        in="spread"
                        stdDeviation="30"
                        result="ambilight-light"
                    />
                    <feOffset in="SourceGraphic" result="source" />
                    <feComposite in="source" in2="ambilight-light" operator="over" />
                </filter>
            </svg>
            <div className={styles.options}>
                <RiDownloadLine onClick={handleDownload} />
            </div>
        </Dialog>
    );
}

Lightbox.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string),
    onClose: PropTypes.func,
    open: PropTypes.bool
}

export default Lightbox;

// eslint-disable-next-line react/prop-types
const BeatyImage = ({ image }) => {
    const [loading, setLoading] = useState(true);
    const classNameImg = classNames(styles.loadingImg,
        {
            [styles.beautyImage]: !loading
        });

    useEffect(() => {
        setLoading(true);
    }, [image])

    return (
        <>
            {loading && <Spinner fontSize={'20px'} style={{ position: 'absolute', top: '48%', left: '50%', translate: '-50% 0', color: 'white' }} />}
            <img
                className={classNameImg}
                onLoad={() => setLoading(false)}
                width={300}
                height={'auto'}
                src={image}
                alt={`image-${image}`}
            />
        </>
    );
}