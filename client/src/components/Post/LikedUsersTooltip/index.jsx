import styled from "@emotion/styled";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import PropTypes from 'prop-types';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

const LikedUsersTooltip = ({ children, content }) => {
    return (
        <HtmlTooltip
            title={
                <>
                    {content}
                </>
            }
        >
            {children}
        </HtmlTooltip>
    )
}

LikedUsersTooltip.propTypes = {
    children: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired
}

export default LikedUsersTooltip