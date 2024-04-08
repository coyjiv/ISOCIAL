import PropTypes from 'prop-types';
import { useState, useCallback, useRef, memo } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
// import { useDebounceEffect } from "../../../hooks/useDebounceEffect";
import { canvasPreview } from "./canvasPreview";
import { Stepper } from "../../Stepper";
import { getDownloadURL, getStorage, ref, uploadBytesResumable, deleteObject } from "firebase/storage";
import { useUpdateProfileMutation, useGetProfileByIdQuery } from '../../../store/services/profileService';
import CropStep from "./steps/CropStep";
import PreviewStep from "./steps/PreviewStep";
import Dropzone from "./steps/Dropzone";
import { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop';

const MediaUpload = ({ modalTitle, customOptions, ...props }) => {
    const id = localStorage.getItem('userId');

    const { onClose, open } = props;

    const [file, setFile] = useState(null);
    const [imgSrc, setImgSrc] = useState("");
    const previewCanvasRef = useRef(null);
    const imgRef = useRef(null);
    const initialCrop = {
        unit: '%',
        ...customOptions
    }
    const [crop, setCrop] = useState(initialCrop);
    // const [completedCrop, setCompletedCrop] = useState(initialCrop);
    const { data: profile } = useGetProfileByIdQuery(id);
    const [updateProfile] = useUpdateProfileMutation(id);
    const [uploadProgress, setUploadProgress] = useState(0);

    const updateProfileImage = (url, id, type = 'avatar') => {
        if (type === 'avatar') {
            if (profile?.avatarsUrl?.length > 0) {
                updateProfile({ body: JSON.stringify({ avatarsUrl: [url, ...(profile.avatarsUrl)] }), id: id });
            } else {
                updateProfile({ body: JSON.stringify({ avatarsUrl: [url] }), id: id });
            }
        } else if (type === 'banner') {
            updateProfile({ body: JSON.stringify({ bannerUrl: url }), id: id });
        } else if (type === 'postAttachment') {
            customOptions?.callbackOnUpload(url);
        }
    }

    const handleClose = () => {
        setUploadProgress(0);
        setFile(null);
        setImgSrc("");
        setCrop(initialCrop);
        // setCompletedCrop(null);

        onClose();
    };


    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        // const cropWidthInPercent = (customOptions.minWidth / width) * 100;

        const crop = makeAspectCrop(
            {
                unit: "%",
                width: customOptions.minWidth,
            },
            customOptions.aspect,
            width,
            height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };


    const onDrop = useCallback((acceptedFiles) => {
        setFile(acceptedFiles[0]);
        setImgSrc(URL.createObjectURL(acceptedFiles[0]));
        // if (customOptions.field === 'banner') {
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const onUploadCropAvatarClick = async () => {
        const image = imgRef.current;
        const previewCanvas = previewCanvasRef.current;
        if (!image || !previewCanvas || !crop) {
            throw new Error("Crop canvas does not exist");
        }

        const newCrop = convertToPixelCrop(
            crop,
            imgRef.current.width,
            imgRef.current.height
        )

        // This will size relative to the uploaded image
        // size. If you want to size according to what they
        // are looking at on screen, remove scaleX + scaleY
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const offscreen = new OffscreenCanvas(
            newCrop.width * scaleX,
            newCrop.height * scaleY,
        );
        const ctx = offscreen.getContext("2d");
        if (!ctx) {
            throw new Error("No 2d context");
        }

        ctx.drawImage(
            previewCanvas,
            0,
            0,
            previewCanvas.width,
            previewCanvas.height,
            0,
            0,
            offscreen.width,
            offscreen.height,
        );
        // You might want { type: "image/jpeg", quality: <0 to 1> } to
        // reduce image size
        const blob = await offscreen.convertToBlob({
            type: "image/png",
        });

        const storage = getStorage();
        const storageRef = ref(storage, customOptions.field === 'avatar'
            ? `${import.meta.env.MODE}/${id}/user_avatar/${file.name}`
            : customOptions.field === 'banner'
                ? `${import.meta.env.MODE}/${id}/user_banner/${file.name}`
                : `${import.meta.env.MODE}/${id}/user_posts/${file.name}`);

        if (customOptions.field === 'banner' && (profile.bannerUrl && profile.bannerUrl?.includes('firebasestorage'))) {
            deleteObject(ref(getStorage(), profile.bannerUrl)).then(() => {
                // File deleted successfully
            }).catch((error) => {
                console.error(error);
            });

        }

        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setUploadProgress(progress);
                // switch (snapshot.state) {
                //     case 'paused':
                //         console.log('Upload is paused');
                //         break;
                //     case 'running':
                //         console.log('Upload is running');
                //         break;
                // }
            },
            (error) => {
                console.error(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    updateProfileImage(downloadURL, id, customOptions?.field);

                    handleClose();
                });
            }
        );

    }

    // useDebounceEffect(
    //     async () => {
    //         if (
    //             crop?.width &&
    //             crop?.height &&
    //             imgRef.current &&
    //             previewCanvasRef.current
    //         ) {

    //         }
    //     },
    //     500,
    //     [crop],
    // );

    const preview = useCallback(() => setTimeout(() => {
        canvasPreview(
            imgRef.current,
            previewCanvasRef.current,
            convertToPixelCrop(
                crop,
                imgRef.current.width,
                imgRef.current.height
            ),
        )

    }, 1000), [crop]);

    const avatarSteps = [
        <Dropzone key={1} customTitle={customOptions?.dropzoneDescription} onDrop={onDrop} file={file} resetFile={() => setFile(null)} />,
        <CropStep key={2} customSettings={customOptions} imgSrc={imgSrc} onImageLoad={onImageLoad} imgRef={imgRef} crop={crop} setCrop={setCrop} />,
        <PreviewStep key={3} preview={preview} completedCrop={crop} previewCanvasRef={previewCanvasRef} onUploadCropAvatarClick={onUploadCropAvatarClick} uploadProgress={uploadProgress} />
    ];

    return (
        <Dialog scroll="paper" sx={{
            '& .MuiDialog-paper': {
                width: '500px',
                textAlign: 'center',
                padding: '20px',
            }
        }} onClose={handleClose} open={open}>
            <DialogTitle fontSize={20} fontWeight={900} >{modalTitle}</DialogTitle>
            <DialogContent>
                <Stepper onComplete={() => console.log('finish')} disabledButtons={{ prev: false, next: !file }} steps={avatarSteps} />
            </DialogContent>
        </Dialog>
    )
}


MediaUpload.propTypes = {
    modalTitle: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    customOptions: PropTypes.shape({
        aspect: PropTypes.number,
        minWidth: PropTypes.number,
        minHeight: PropTypes.number,
        field: PropTypes.string,
        x: PropTypes.number,
        y: PropTypes.number,
        height: PropTypes.number,
        width: PropTypes.number,
        callbackOnUpload: PropTypes.func,
        dropzoneDescription: PropTypes.string
    })
}

MediaUpload.defaultProps = {
    customOptions: {
        aspect: 1,
        minWidth: 200,
        minHeight: 200,
        height: 200,
        width: 200,
        field: 'avatar',
    }
}

const MemoMediaUpload = memo(MediaUpload);

export default MemoMediaUpload