import PropTypes from 'prop-types'
import { CircularProgress } from '@mui/material'
import { BlueRoundedButton } from '../../../buttons'
import styles from '../mediaUpload.module.scss'

const PreviewStep = ({ completedCrop, previewCanvasRef, onUploadCropAvatarClick, uploadProgress }) => {
    return (
        !!completedCrop && (
            <>
                <div>
                    <canvas
                        ref={previewCanvasRef}
                        className={styles.previewCanvas}
                        style={{
                            width: completedCrop.width,
                            height: completedCrop.height
                        }}
                    />
                </div>
                <div className={styles.uploadWrapper}>
                    <BlueRoundedButton onClick={onUploadCropAvatarClick} disabled={uploadProgress > 0}>
                        {
                            uploadProgress > 0 ?
                                uploadProgress === 100 ? "Saved" :
                                    <CircularProgress size={'sm'} variant="determinate" value={Math.round(uploadProgress)} /> :
                                "Save changes"
                        }
                    </BlueRoundedButton>
                </div>
            </>
        )
    )
}

PreviewStep.propTypes = {
    completedCrop: PropTypes.object,
    previewCanvasRef: PropTypes.object,
    onUploadCropAvatarClick: PropTypes.func,
    uploadProgress: PropTypes.number,
}

export default PreviewStep