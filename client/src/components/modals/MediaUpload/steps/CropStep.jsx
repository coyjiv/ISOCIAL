import ReactCrop from 'react-image-crop'
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
export default CropStep