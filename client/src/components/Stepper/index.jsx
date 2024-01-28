import { useState } from "react"
import Step from "./Step"
import styles from './stepper.module.scss'

const Stepper = ({ steps = [] }) => {
    const [activeStep, setActiveStep] = useState(0)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    return (
        <div>
            {steps.map((step, index) => (<Step visible={activeStep === index} key={index}>{step}</Step>))}
            <div className={styles.buttonWrapper}>
                <button disabled={activeStep === 0} onClick={handleBack}>prev</button>
                <button disabled={activeStep === steps.length - 1} onClick={handleNext}>next</button>
            </div>
        </div>
    )
}

export { Stepper }