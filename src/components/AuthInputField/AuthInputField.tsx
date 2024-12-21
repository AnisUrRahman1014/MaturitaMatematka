import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import AppIcons from '../../libs/NativeIcons';
import styles from './Styles';
import {Colors} from '../../utils/System/Constants';

type Props = {
  fieldType: 'username' | 'password' | 'email';
  value: any;
  placeholder: string;
  onChangeText: any;
  secureTextEntry: boolean;
  errorMessage?: string | boolean | undefined;
};
const AuthInputField = (props: Props) => {
  const {
    fieldType,
    value,
    placeholder,
    onChangeText,
    secureTextEntry = false,
    errorMessage,
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  switch (fieldType) {
    case 'username':
      return (
        <>
          <View style={styles.container}>
            <View style={styles.iconContainer}>
              <AppIcons.UserIcon size={30} color={Colors.primaryDark} />
            </View>
            <View style={styles.fieldContainer}>
              <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                inputMode="email"
                style={styles.input}
                secureTextEntry={secureTextEntry}
              />
            </View>
          </View>
          {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </>
      );
    case 'password':
      return (
        <>
          <View style={styles.container}>
            <View style={styles.iconContainer}>
              <AppIcons.LockIcon size={30} color={Colors.primaryDark} />
            </View>
            <View style={styles.fieldContainer}>
              <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                inputMode="text"
                style={styles.input}
                onChange={onChangeText}
                secureTextEntry={!showPassword}
              />
            </View>
            <View style={styles.eyeContainer}>
              {showPassword ? (
                <AppIcons.EyeOffIcon
                  size={24}
                  color={Colors.primaryDark}
                  onPress={() => setShowPassword(false)}
                />
              ) : (
                <AppIcons.EyeIcon
                  size={24}
                  color={Colors.primaryDark}
                  onPress={() => setShowPassword(true)}
                />
              )}
            </View>
          </View>
          {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </>
      );
    case 'email':
      return (
        <>
          <View style={styles.container}>
            <View style={styles.iconContainer}>
              <AppIcons.EmailIcon size={30} color={Colors.primaryDark} />
            </View>
            <View style={styles.fieldContainer}>
              <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                inputMode="email"
                style={styles.input}
                secureTextEntry={secureTextEntry}
              />
            </View>
          </View>
          {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </>
      );
  }
};

export default AuthInputField;
