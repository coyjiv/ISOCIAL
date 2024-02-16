import ReactCrop from 'react-image-crop'
import PropTypes from 'prop-types'
import styles from '../mediaUpload.module.scss'
import 'react-image-crop/src/ReactCrop.scss'

const CropStep = ({ imgSrc, onImageLoad, imgRef, crop, setCrop, setCompletedCrop, customSettings }) => {
    return (
        <div className={styles.cropWrapper}>
            <ReactCrop
                minWidth={customSettings.minWidth}
                minHeight={customSettings.minHeight}
                aspect={customSettings.aspect}
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
    customSettings: PropTypes.shape({
        aspect: PropTypes.number,
        minWidth: PropTypes.number,
        minHeight: PropTypes.number,
    })
}

CropStep.defaultProps = {
    customSettings: {
        aspect: 1,
        minWidth: 200,
        minHeight: 200,
        x: 25,
        y: 25
    }
}
export default CropStep