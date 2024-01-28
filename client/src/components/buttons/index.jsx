import PropTypes from 'prop-types';
import { Button } from '@mui/base';
import styles from './buttons.module.scss'

const GrayButton = ({ children, ...props }) => {
    return <Button {...props} className={styles.grayButton}>{children}</Button>;
};

const BlueRoundedButton = ({ children, ...props }) => {
    return <Button {...props} className={styles.blueRoundedButton}>{children}</Button>;
};

GrayButton.propTypes = {
    children: PropTypes.node.isRequired,
};

BlueRoundedButton.propTypes = {
    children: PropTypes.node.isRequired,
};

export { GrayButton, BlueRoundedButton }