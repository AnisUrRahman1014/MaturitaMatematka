import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

export const showSuccess = (message: string) => {
    Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: message,
    })
}

export const showWarning = (message: string) => {
    Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Warning',
        textBody: message,
    })
}

export const showError = (message: string) => {
    Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: message,
    })
}

export const showInfo = (message: string) => {
    Toast.show({
        type: ALERT_TYPE.INFO,
        title: 'Info',
        textBody: message,
    })
}