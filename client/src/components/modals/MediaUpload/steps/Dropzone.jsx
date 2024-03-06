import { Button, Typography } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import PropTypes from 'prop-types'
import styles from '../mediaUpload.module.scss'

const Dropzone = ({ onDrop, file, resetFile, customTitle }) => {
    const { getRootProps, getInputProps, } = useDropzone({
        onDrop, noClick: !!file, accept: {
            'image/jpeg': [],
            'image/png': [],
        },
        maxFiles: 1,
    })


    return (
        <>
            {!file ?
                <div className={styles.dropzone} {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                        <Typography>{customTitle ?? 'Drag and drop or simply click to select a new avatar'}</Typography>
                    }
                </div>
                :
                <div>
                    <div className={styles.dropzonePreview}>
                        <img src={URL.createObjectURL(file)} alt="image to upload" />
                    </div>
                    <Button onClick={resetFile} fullWidth sx={{ marginTop: '20px' }}>Reset</Button>
                </div>
            }
        </>
    )
}

Dropzone.propTypes = {
    onDrop: PropTypes.func.isRequired,
    file: PropTypes.object,
    resetFile: PropTypes.func.isRequired,
    customTitle: PropTypes.string
}


export default Dropzone