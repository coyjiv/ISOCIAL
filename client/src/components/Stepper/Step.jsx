import classNames from 'classnames'
import styles from './stepper.module.scss'

const Step = ({ children, visible }) => {
    const stepClasses = classNames(styles.step, { [styles.visible]: visible })
    return (
        <div className={stepClasses}>{children}</div>
    )
}

export default Step