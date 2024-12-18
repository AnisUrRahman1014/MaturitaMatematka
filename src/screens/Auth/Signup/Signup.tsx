import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackList} from '../../../navigation/types';
import {section} from '../../../libs/Global';
import styles from './Styles';
import {Image} from 'react-native';
import {Images} from '../../../../assets/images';
import AuthInputField from '../../../components/AuthInputField/AuthInputField';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AppIcons from '../../../libs/NativeIcons';
import {Colors} from '../../../utils/System/Constants';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

type Props = {
  navigation: NativeStackNavigationProp<RootStackList, 'Login'>;
};

const strings = {
  Username: 'Username',
  Email: 'Email',
  Password: 'Password',
  ConfirmPassword: 'ConfirmPassword',
};

const Signup = (props: Props) => {
  const {navigation} = props;
  const [profilePic, setProfilePic] = useState('');

  const validationSchema = Yup.object({
    [strings.Username]: Yup.string().required('Username is required'),
    [strings.Email]: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    [strings.Password]: Yup.string()
      .min(6, 'Minimum 6 characters')
      .required('Password is Required'),
    [strings.ConfirmPassword]: Yup.string()
      .min(6, 'Minimum 6 characters')
      .required('Required'),
  });

  const handleSignUp = (values: any) => {
    auth()
      .createUserWithEmailAndPassword(
        values[strings.Email].toLowerCase(),
        values[strings.Password],
      )
      .then(async res => {
        console.log(
          'User account created & signed in!',
          JSON.stringify(res, null, 2),
        );
        firestore()
          .collection('users')
          .doc(res?.user?.uid)
          .set({
            userName: values[strings.Username],
            email: values[strings.Email],
            userId: res?.user?.uid,
          })
          .then(() => {
            console.log('User added!');
            // setLoading(false);
            // props.navigation.navigate(Routes.Login);
          });
      })
      .catch(error => {
        console.log('createUserWithEmailAndPassword error:', error);
        // setLoading(false);
        if (error.code === 'auth/email-already-in-use') {
          console.log(error);
          // showError('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log(error);
          // showError('That email address is invalid!');
        }

        console.error(error);
      });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={[section(0.45, 'column'), styles.headerContainer]}>
        <AppIcons.BackArrowIcon
          size={20}
          color={Colors.primaryDark}
          style={{
            alignSelf: 'flex-start',
            marginHorizontal: '4%',
            marginVertical: '2%',
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.welcomeTxt}>Welcome to</Text>
        <Text style={styles.appName}>Maturita Matematka</Text>
        <TouchableOpacity style={styles.dpContainer}>
          <Image
            source={{uri: profilePic}}
            defaultSource={Images.dpPlaceholder}
            resizeMode="contain"
            style={{
              width: '80%',
              height: '80%',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={[section(0.65, 'column')]}>
        <Formik
          initialValues={{
            [strings.Username]: '',
            [strings.Email]: '',
            [strings.Password]: '',
            [strings.ConfirmPassword]: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}>
          {({handleSubmit, handleChange, errors, values, touched}) => {
            return (
              <KeyboardAwareScrollView style={{flex: 1}}>
                <View style={[section(2, 'column'), styles.formContainer]}>
                  <AuthInputField
                    placeholder={strings.Username}
                    fieldType="username"
                    onChangeText={handleChange(strings.Username)}
                    value={values[strings.Username]}
                    secureTextEntry={false}
                    errorMessage={errors[strings.Username]}
                  />
                  <AuthInputField
                    placeholder={strings.Email}
                    fieldType="email"
                    onChangeText={handleChange(strings.Email)}
                    value={values[strings.Email]}
                    secureTextEntry={false}
                    errorMessage={errors[strings.Email]}
                  />
                  <AuthInputField
                    placeholder={strings.Password}
                    secureTextEntry
                    fieldType="password"
                    onChangeText={handleChange(strings.Password)}
                    value={values[strings.Password]}
                    errorMessage={errors[strings.Password]}
                  />
                  <AuthInputField
                    placeholder={strings.ConfirmPassword}
                    secureTextEntry
                    fieldType="password"
                    onChangeText={handleChange(strings.ConfirmPassword)}
                    value={values[strings.ConfirmPassword]}
                    errorMessage={errors[strings.ConfirmPassword]}
                  />
                  <CustomButton
                    label={'Sign Up'}
                    containerStyle={{
                      width: '70%',
                      alignSelf: 'center',
                      height: '12%',
                    }}
                    onPress={handleSubmit}
                  />
                </View>
              </KeyboardAwareScrollView>
            );
          }}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
