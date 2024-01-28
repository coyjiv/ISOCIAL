import classNames from 'classnames'
import PropTypes from 'prop-types'
import styles from './stepper.module.scss'

const Step = ({ children, visible }) => {
    const stepClasses = classNames(styles.step, { [styles.visible]: visible })
    return (
        <div className={stepClasses}>{children}</div>
    )
}

Step.propTypes = {
    children: PropTypes.node,
    visible: PropTypes.bool
}

export default Step