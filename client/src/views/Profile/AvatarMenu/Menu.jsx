import { Menu as MUIMenu, MenuItem } from "@mui/material"
import { isPersonalProfile } from "../Profile";
import PropTypes from 'prop-types'

const Menu = ({ onClose, open, anchorEl }) => {
    const handleClose = (actionType) => {
        onClose(null, actionType);
    };
    return (
        <MUIMenu sx={{
            '& .MuiMenu-paper': {
                width: '300px',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
                padding: '5px',
                '& .MuiMenuItem-root': {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    lineHeight: '17px',
                    color: '#4F4F4F',
                    padding: '10px 20px',
                    borderRadius: '10px',

                }
            }

        }} anchorEl={anchorEl} open={open} onClose={onClose}>
            <MenuItem onClick={() => handleClose('view')}>
                View {isPersonalProfile && 'your'} profile avatar
            </MenuItem>
            {isPersonalProfile && <MenuItem onClick={() => handleClose('upload')}>
                Select a new avatar
            </MenuItem>}
        </MUIMenu>
    )
}

Menu.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    anchorEl: PropTypes.object,
}

export default Menu