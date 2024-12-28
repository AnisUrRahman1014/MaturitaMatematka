import {View, Text, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import NavHeader from '../../../components/NavHeader/NavHeader';
import styles from './Styles';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AuthInputField from '../../../components/AuthInputField/AuthInputField';
import CustomButton from '../../../components/CustomButton/CustomButton';
import auth from '@react-native-firebase/auth';
import {showError, showSuccess} from '../../../utils/System/MessageHandlers';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackList} from '../../../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackList, 'ForgetPassword'>;
};

const ForgetPassword = (props: Props) => {
  const {navigation} = props;
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const handleForgotPassword = async values => {
    console.log(values);
    auth()
      .sendPasswordResetEmail(values.email.toLowerCase())
      .then(() => {
        console.log('Password reset email sent successfully');
        // setLoading(false);
        showSuccess('Password reset email sent successfully');
        navigation.goBack();
      })
      .catch(error => {
        console.error(
          'Error sending password reset email:',
          JSON.stringify(error, null, 2),
        );
        // setLoading(false);
        showError('Something went wrong. Please try again.');
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavHeader leftIcon centerText="Reset your password" />
      <View style={styles.container}>
        <Text style={styles.desc}>
          Please enter your email address. An email will be sent to you to
          proceed with your request.
        </Text>

        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleForgotPassword}>
          {({values, errors, touched, handleSubmit, handleChange}) => {
            return (
              <>
                <AuthInputField
                  placeholder="Enter your email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  errorMessage={errors.email || touched?.email}
                  fieldType="email"
                  secureTextEntry={false}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 20,
                    width: '100%',
                    alignSelf: 'center',
                  }}>
                  <CustomButton
                    label={'Reset Password'}
                    onPress={handleSubmit}
                    containerStyle={{height: 50}}
                  />
                </View>
              </>
            );
          }}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default ForgetPassword;
