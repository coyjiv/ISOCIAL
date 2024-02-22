import {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import { CgClose } from 'react-icons/cg'
import { Typography, Box } from '@mui/material'


import { notificationIconsMap } from './NotificationToast.utils'
import {TOASTS_DURATION} from "../../utils/constants";
import {
  IconWrapper,
  ToastContentWrapper, 
  ToastProgressbar,
  ToastWrapper,
} from './NotificationToast.styled'


const NotificationToast = ({ type, message, duration, onRemove }) => {
    const [progress, setProgress] = useState(100);

    useEffect(() => {  
      const interval = setInterval(() => {  
        setProgress((prevProgress) => {  
          if (prevProgress > 0) {  
            return prevProgress - 100 / (duration / 10);  
          }  
          clearInterval(interval);  
          return 0;  
        });  
      }, 10);  
    
      return () => clearInterval(interval);  
    }, [duration]);  

    return (
    <ToastWrapper>
      <ToastContentWrapper color={type}>
        <Box minWidth="22px">{notificationIconsMap[type]}</Box>
        <Typography fontSize="16px">{message}</Typography>
      </ToastContentWrapper>
      <IconWrapper onClick={onRemove}>
        <CgClose size="22px" color="inherit" />
      </IconWrapper>
        <ToastProgressbar progress={progress} color={type}/>
    </ToastWrapper>
  )
}

NotificationToast.propTypes = {
  type: PropTypes.oneOf([ 'info', 'warning', 'success', 'error' ]),
  message: PropTypes.string,
  duration: PropTypes.number,
  onRemove: PropTypes.func,
}

NotificationToast.defaultProps = {
  type: 'info',
  message: 'Some message',
  duration: TOASTS_DURATION,
}


NotificationToast.displayName = 'NotificationToast'

export default NotificationToast
