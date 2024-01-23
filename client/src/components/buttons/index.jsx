import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import './styles.scss';

const GrayButton = ({ children }) => {
    return <Button className="gray-button">{children}</Button>;
};

GrayButton.propTypes = {
    children: PropTypes.node.isRequired,
};

export { GrayButton }