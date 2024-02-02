import PropTypes from 'prop-types';
import { useState, useCallback, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
// import { BlueRoundedButton } from "../../buttons";
import { useDebounceEffect } from "../../../hooks/useDebounceEffect";
import { canvasPreview } from "./canvasPreview";
import { Stepper } from "../../Stepper";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useUpdateProfileMutation, useGetProfileByIdQuery } from '../../../store/services/profileService';
import CropStep from "./steps/CropStep";
import PreviewStep from "./steps/PreviewStep";
import Dropzone from "./steps/Dropzone";

const MediaUpload = ({ modalTitle, ...props }) => {
    const id = localStorage.getItem('userId');

    const { onClose, open } = props;

    const [file, setFile] = useState(null);
    const [imgSrc, setImgSrc] = useState("");
    const previewCanvasRef = useRef(null);
    const imgRef = useRef(null);
    const [crop, setCrop] = useState({
        unit: '%',
        width: 50,
        height: 50,
        x: 25,
        y: 25
    });
    const [completedCrop, setCompletedCrop] = useState();
    const { data: profile, isLoading } = useGetProfileByIdQuery(id);
    const [updateProfile] = useUpdateProfileMutation(id);

    const updateProfileAvatar = (url, id) => updateProfile({ body: JSON.stringify({ avatarsUrl: [url, ...(profile.avatarsUrl)] }), id: id });


    // test before integration in onUploadCropAvatarClick
    useEffect(() => {
        if (!isLoading && id && confirm("yes or no")) {
            updateProfileAvatar('https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D', id);
        }
    }, [id, isLoading])

    const handleClose = () => {
        onClose();
    };


    const onImageLoad = () => {
        setCrop({
            unit: '%',
            width: 50,
            height: 50,
            x: 25,
            y: 25
        });
    }


    const onDrop = useCallback((acceptedFiles) => {
        setFile(acceptedFiles[0]);
        setImgSrc(URL.createObjectURL(acceptedFiles[0]));
    }, []);




    const onUploadCropAvatarClick = async () => {
        const image = imgRef.current;
        const previewCanvas = previewCanvasRef.current;
        if (!image || !previewCanvas || !completedCrop) {
            throw new Error("Crop canvas does not exist");
        }

        // This will size relative to the uploaded image
        // size. If you want to size according to what they
        // are looking at on screen, remove scaleX + scaleY
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const offscreen = new OffscreenCanvas(
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
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
        const storageRef = ref(storage, `${import.meta.env.MODE}/user_avatar/${id}`);

        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on('state_changed',
            (snapshot) => {

                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            // (error) => {
            //     Handle unsuccessful uploads
            // },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                });
            }
        );
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                );
            }
        },
        100,
        [completedCrop],
    );

    const avatarSteps = [
        <Dropzone key={1} onDrop={onDrop} file={file} resetFile={() => setFile(null)} />,
        <CropStep key={2} imgSrc={imgSrc} onImageLoad={onImageLoad} imgRef={imgRef} crop={crop} setCrop={setCrop} setCompletedCrop={setCompletedCrop} />,
        <PreviewStep key={3} completedCrop={completedCrop} previewCanvasRef={previewCanvasRef} onUploadCropAvatarClick={onUploadCropAvatarClick} />
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
            {/* <BlueRoundedButton disabled={true}>Create a post</BlueRoundedButton> */}
        </Dialog>
    )
}


MediaUpload.propTypes = {
    modalTitle: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
}

export default MediaUpload