import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './Styles';
import {Colors} from '../../utils/System/Constants';

type Props = {
  visible: boolean;
  heading: string;
  message: string;
  confirmButtonTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
};
const AlertModal = (props: Props) => {
  const {visible, heading, message, confirmButtonTitle, onConfirm, onCancel} =
    props;

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.backdrop}>
        <View style={styles.alertContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>{heading}</Text>
          </View>

          <View style={styles.messageContainer}>
            <Text style={styles.message}>{message}</Text>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.btn} onPress={onCancel}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{...styles.btn, backgroundColor: Colors.primaryDark}}
              onPress={onConfirm}>
              <Text style={{...styles.btnText, color: Colors.white}}>
                {confirmButtonTitle}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;
