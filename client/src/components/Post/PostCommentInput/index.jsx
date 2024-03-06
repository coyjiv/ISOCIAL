import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { AutosizeTextareaSend } from '../../AutosizeTextareaSend';

export const PostCommentInput = ({ handleComment }) => {
    const validationScheme = Yup.object().shape({
        text: Yup.string().required('You can\'t create an empty comment').max(280, 'Comment is too long')
    })

    return (
        <AutosizeTextareaSend
            onSubmit={handleComment}
            validationScheme={validationScheme}
            placeholder={'Write a comment...'}
        />
    )
}

PostCommentInput.propTypes = {
    handleComment: PropTypes.func.isRequired,
}