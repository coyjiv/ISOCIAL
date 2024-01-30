import PropTypes from 'prop-types'
import { BlueRoundedButton } from '../../../buttons'
import styles from '../mediaUpload.module.scss'

const PreviewStep = ({ completedCrop, previewCanvasRef, onUploadCropAvatarClick }) => {
    return (
        !!completedCrop && (
            <>
                <div>
                    <canvas
                        ref={previewCanvasRef}
                        className={styles.previewCanvas}
                        style={{
                            width: completedCrop.width,
                            height: completedCrop.height,
                        }}
                    />
                </div>
                <div className={styles.uploadWrapper}>
                    <BlueRoundedButton onClick={onUploadCropAvatarClick}>Save changes</BlueRoundedButton>
                </div>
            </>
        )
    )
}

PreviewStep.propTypes = {
    completedCrop: PropTypes.object,
    previewCanvasRef: PropTypes.object,
    onUploadCropAvatarClick: PropTypes.func
}

export default PreviewStep