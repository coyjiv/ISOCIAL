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

const RedRoundedButton = ({ children, ...props }) => {
    return <Button {...props} className={classNames(styles.redRoundedButton, props.className)}>{children}</Button>;
}

const GreenRoundedButton = ({ children, ...props }) => {
    return <Button {...props} className={classNames(styles.greenRoundedButton, props.className)}>{children}</Button>;
}

const IconButton = ({ children, ...props }) => {
    return <Button {...props} className={classNames(styles.iconButton, props.className)}>{children}</Button>;
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

RedRoundedButton.propTypes = {
    children: PropTypes.node.isRequired,
    props: PropTypes.object,
    className: PropTypes.string
};

GreenRoundedButton.propTypes = {
    children: PropTypes.node.isRequired,
    props: PropTypes.object,
    className: PropTypes.string
};

IconButton.propTypes = {
    children: PropTypes.node.isRequired,
    props: PropTypes.object,
    className: PropTypes.string
};

export { GrayButton, BlueRoundedButton, WhiteButton, RedRoundedButton, GreenRoundedButton, IconButton }