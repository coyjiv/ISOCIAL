import PropTypes from 'prop-types'
import Comment from '../../Comment'

const RecentComments = ({ comments, onCommentDelete }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {comments.map((comment) => (
                <Comment onCommentDelete={onCommentDelete} key={comment.id} {...comment} />
            ))}
        </div>
    )
}

RecentComments.propTypes = {
    comments: PropTypes.array.isRequired,
    onCommentDelete: PropTypes.func.isRequired,
}

export default RecentComments
