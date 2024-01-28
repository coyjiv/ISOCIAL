import PropTypes from 'prop-types'

const PreviewStep = ({ completedCrop, previewCanvasRef, onUploadCropAvatarClick }) => {
    return (
        !!completedCrop && (
            <>
                <div>
                    <canvas
                        ref={previewCanvasRef}
                        style={{
                            border: "1px solid black",
                            objectFit: "contain",
                            width: completedCrop.width,
                            height: completedCrop.height,
                        }}
                    />
                </div>
                <div>
                    <button onClick={onUploadCropAvatarClick}>Save changes</button>
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