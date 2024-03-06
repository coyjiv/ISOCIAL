import { useState } from "react"
import PropTypes from "prop-types"
import Step from "./Step"
import styles from './stepper.module.scss'
import { Button } from "@mui/material"
import classNames from "classnames"

const Stepper = ({ steps = [], customButtonNames = { next: null, prev: null }, disabledButtons, onComplete }) => {
    const [activeStep, setActiveStep] = useState(0)
    const isFirst = activeStep === 0
    const isLast = activeStep === steps.length - 1

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            onComplete()
            return
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const buttonClasses = classNames({
        [styles.button]: true,
        [styles.soloButton]: isFirst || isLast,
    })

    return (
        <div>
            {steps.map((step, index) => (<Step visible={activeStep === index} key={index}>{step}</Step>))}
            <div className={styles.buttonWrapper}>
                {!isFirst && <Button className={buttonClasses} disabled={disabledButtons?.prev} onClick={handleBack}>{customButtonNames.prev ?? 'Back'}</Button>}
                {!isLast && <Button className={buttonClasses} disabled={disabledButtons?.next} onClick={handleNext}>{customButtonNames.next ?? 'Next'}</Button>}
            </div>
        </div>
    )
}

Stepper.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.node).isRequired,
    onComplete: PropTypes.func.isRequired,
    disabledButtons: PropTypes.shape({
        next: PropTypes.bool,
        prev: PropTypes.bool,
    }),
    customButtonNames: PropTypes.shape({
        next: PropTypes.string,
        prev: PropTypes.string,
    })
}

export { Stepper }