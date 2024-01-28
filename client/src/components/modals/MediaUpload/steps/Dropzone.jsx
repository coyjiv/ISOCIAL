import { Typography } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import PropTypes from 'prop-types'
import styles from '../mediaUpload.module.scss'

const Dropzone = ({ onDrop, file }) => {
    const { getRootProps, getInputProps, } = useDropzone({
        onDrop, noClick: !!file, accept: {
            'image/jpeg': [],
            'image/png': [],
        },
        maxFiles: 1,
    })


    return (
        <>
            {!file ? <div className={styles.dropzone} {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    <Typography>Drag and drop or simply click to select a new avatar</Typography>
                }
            </div> :
                <div>
                    <div className={styles.dropzonePreview}>
                        <img src={URL.createObjectURL(file)} alt="avatar" />
                    </div>
                </div>
            }
        </>
    )
}

Dropzone.propTypes = {
    onDrop: PropTypes.func.isRequired,
    file: PropTypes.object,
}


export default Dropzone