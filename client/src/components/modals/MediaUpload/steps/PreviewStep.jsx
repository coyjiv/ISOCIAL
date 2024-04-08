import PropTypes from 'prop-types'
import { CircularProgress } from '@mui/material'
import { BlueRoundedButton } from '../../../buttons'
import styles from '../mediaUpload.module.scss'
import { useEffect } from 'react'

const PreviewStep = ({ preview, completedCrop, previewCanvasRef, onUploadCropAvatarClick, uploadProgress }) => {
    useEffect(() => {
        preview()
    }, [preview])
    console.log('rerender');
    return (
        !!completedCrop && (
            <>
                <div>
                    <canvas
                        ref={previewCanvasRef}
                        className={styles.previewCanvas}
                        style={{
                            // display: "none",
                            objectFit: "contain",
                            width: '100%',
                            height: '100%   ',
                        }}
                    />
                </div>
                <div className={styles.uploadWrapper}>
                    <BlueRoundedButton onClick={onUploadCropAvatarClick} disabled={uploadProgress > 0}>
                        {
                            uploadProgress > 0 ?
                                uploadProgress === 100 ? "Saved" :
                                    <CircularProgress size={'lg'} variant="determinate" color='black' value={Math.round(uploadProgress)} /> :
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
    preview: PropTypes.func
}

export default PreviewStep