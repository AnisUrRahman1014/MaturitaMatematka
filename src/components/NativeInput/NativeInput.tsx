import {View, Text, TextInput, StyleProp, ViewStyle, TextStyle} from 'react-native';
import React from 'react';
import styles from './Styles';

type Props = {
  value: any;
  placeholder: string;
  onChangeText: any;
  secureTextEntry: boolean;
  errorMessage?: string | boolean | undefined;
  editable?: boolean
  customContainerStyles?: StyleProp<ViewStyle>
  customInputStyles?: StyleProp<TextStyle>
  customFieldContainerStyles?: StyleProp<ViewStyle>
};
const NativeInput = (props: Props) => {
  const {
    value,
    placeholder,
    onChangeText,
    secureTextEntry = false,
    errorMessage,
    editable = true,
    customContainerStyles,
    customInputStyles,
    customFieldContainerStyles,
  } = props;

  return (
    <>
      <View style={[styles.container, customContainerStyles]}>
        <View style={[styles.fieldContainer, customFieldContainerStyles]}>
          <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            inputMode="text"
            style={[styles.input, customInputStyles]}
            secureTextEntry={secureTextEntry}
            autoCapitalize="sentences"
            multiline= {true}
            editable={editable}
          />
        </View>
      </View>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </>
  );
};

export default NativeInput;
