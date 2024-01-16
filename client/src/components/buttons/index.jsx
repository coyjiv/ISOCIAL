import PropTypes from 'prop-types';
import './styles.scss';

const GrayButton = ({children}) => {
    return <button className="gray-button">{children}</button>;
    };

GrayButton.propTypes = {
    children: PropTypes.node.isRequired,
};

export { GrayButton }