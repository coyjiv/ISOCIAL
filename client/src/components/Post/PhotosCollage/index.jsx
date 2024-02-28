import { useState } from 'react';
import PropTypes from 'prop-types';
import Lightbox from '../../modals/Lightbox';
import styles from './photosCollage.module.scss'

const PhotosCollage = ({ images }) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
        setLightboxOpen(true);
    };

    const getCollageClass = () => {
        switch (images.length) {
            case 1:
                return styles.oneImage;
            case 2:
                return styles.twoImages;
            default:
                return styles.threeOrMoreImages;
        }
    };

    return (
        <>
            <div className={`${styles.collage} ${getCollageClass()}`}>
                {images.slice(0, 3).map((image, index) => (
                    <div key={index} className={styles.imageContainer} onClick={() => handleImageClick(index)}>
                        <img loading='lazy' src={image} alt={`Image ${index + 1}`} />
                        {index === 1 && images.length > 3 && (
                            <div className={styles.overlay}>
                                +{images.length - 3}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {lightboxOpen && (
                <Lightbox
                    images={images}
                    open={lightboxOpen}
                    onClose={() => setLightboxOpen(false)}
                    selectedImageIndex={selectedImageIndex}
                />
            )}
        </>
    );
};

PhotosCollage.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PhotosCollage;
