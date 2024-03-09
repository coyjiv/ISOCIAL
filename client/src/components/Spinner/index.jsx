import { ImSpinner3 } from "react-icons/im";
import styles from './spinner.module.scss'
import classNames from "classnames";

const Spinner = (props) => {
    return (
        // eslint-disable-next-line react/prop-types
        <><ImSpinner3 {...props} className={classNames(styles.spinner, props.className)} /></>
    )
}

export default Spinner