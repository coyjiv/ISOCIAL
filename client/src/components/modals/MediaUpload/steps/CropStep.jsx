import ReactCrop from 'react-image-crop'
import PropTypes from 'prop-types'
import styles from '../mediaUpload.module.scss'
import 'react-image-crop/src/ReactCrop.scss'

const CropStep = ({ imgSrc, onImageLoad, imgRef, crop, setCrop, setCompletedCrop }) => {
    return (
        <div className={styles.cropWrapper}>
            <ReactCrop
                minWidth={200}
                minHeight={200}
                crop={crop}
                onChange={(newCrop) => setCrop(newCrop)}
                onComplete={(c) => setCompletedCrop(c)}
            >
                <img
                    ref={imgRef}
                    alt="Crop me"
                    src={imgSrc}
                    onLoad={onImageLoad}
                />
            </ReactCrop>
        </div>
    )
}

CropStep.propTypes = {
    imgSrc: PropTypes.string,
    onImageLoad: PropTypes.func,
    imgRef: PropTypes.object,
    crop: PropTypes.object,
    setCrop: PropTypes.func,
    setCompletedCrop: PropTypes.func,
}
export default CropStep