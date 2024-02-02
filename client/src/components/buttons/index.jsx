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
    props: PropTypes.object,
};

BlueRoundedButton.propTypes = {
    children: PropTypes.node.isRequired,
    props: PropTypes.object,
};

export { GrayButton, BlueRoundedButton }