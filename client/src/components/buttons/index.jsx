import PropTypes from 'prop-types';
import { Button } from '@mui/base';
import classNames from 'classnames';
import styles from './buttons.module.scss'

const GrayButton = ({ children, ...props }) => {
    return <Button {...props} className={classNames(styles.grayButton, props.className)}>{children}</Button>;
};

const BlueRoundedButton = ({ children, ...props }) => {
    return <Button {...props} className={classNames(styles.blueRoundedButton, props.className)}>{children}</Button>;
};

const WhiteButton = ({ children, ...props }) => {
    return <Button {...props} className={classNames(styles.whiteButton, props.className)}>{children}</Button>;
}

GrayButton.propTypes = {
    children: PropTypes.node.isRequired,
    props: PropTypes.object,
    className: PropTypes.string
};

BlueRoundedButton.propTypes = {
    children: PropTypes.node.isRequired,
    props: PropTypes.object,
    className: PropTypes.string
};

WhiteButton.propTypes = {
    children: PropTypes.node.isRequired,
    props: PropTypes.object,
    className: PropTypes.string
};

export { GrayButton, BlueRoundedButton, WhiteButton }