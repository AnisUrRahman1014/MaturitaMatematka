import {
  View,
  Text,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import styles from './Styles';
import {Images} from '../../../../assets/images';
import AuthInputField from '../../../components/AuthInputField/AuthInputField';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {Colors} from '../../../utils/System/Constants';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackList} from '../../../navigation/types';
import {section} from '../../../libs/Global';
import auth from '@react-native-firebase/auth';
import {showError} from '../../../utils/System/MessageHandlers';
import {useDispatch} from 'react-redux';
import {setUser} from '../../../redux/slices/persistSlice';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const strings = {
  Email: 'Email',
  Password: 'Password',
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackList, 'Login'>;
};
const Login = (props: Props) => {
  const {navigation} = props;

  const dispatch = useDispatch();

  const loginValidationSchema = Yup.object({
    [strings.Email]: Yup.string().email('Invalid email').required('Required'),
    [strings.Password]: Yup.string()
      .min(6, 'Minimum 6 characters')
      .required('Required'),
  });

  const handleLocalSignIn = (values: any) => {
    try {
      auth()
        .signInWithEmailAndPassword(
          values[strings.Email],
          values[strings.Password],
        )
        .then((res: any) => {
          // console.log('Response', res);
          if (res?.user?.uid) {
            const str = JSON.stringify(res);
            const prs = JSON.parse(str);
            const user = {
              uid: prs.user.uid,
              email: prs.user.email,
              displayName: prs.user.displayName,
              photoURL: prs.user.photoURL,
            };
            // Changing the Redux state for the user automatically switches the stack from AuthStack to MainStack
            dispatch(setUser(prs?.user));
            // dispatch(setUser(user));
          }
        })
        .catch(error => {
          console.log('Login Error:', error);
          if (error.code === 'auth/invalid-credential') {
            showError('Incorrect Credentials. Please check your credentials');
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  GoogleSignin.configure({
    webClientId:
      Platform.OS == 'ios'
        ? '1087250027500-mf960e7se19m8a1act7ra80n6e1qfokq.apps.googleusercontent.com'
        : '1087250027500-172u3kose6vbdp6phbid37ebv6gp3i0i.apps.googleusercontent.com',
  });

  async function onGoogleButtonPress() {
    try {
      const isSignedIn = await GoogleSignin.getCurrentUser();
      if (isSignedIn !== null) await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const userInfo = await GoogleSignin.signIn();

      const {user, idToken} = userInfo?.data;
      // console.log('User Info', JSON.stringify(userInfo, null, 1));

      // Create a Firebase credential using the ID token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in to Firebase with the credential
      const firebaseUserCredential = await auth().signInWithCredential(
        googleCredential,
      );

      if (firebaseUserCredential?.user) {
        // console.log(
        //   'Firebase User:',
        //   JSON.stringify(firebaseUserCredential.user, null, 2),
        // );

        const temp = {
          uid: firebaseUserCredential?.user?.uid,
          email: firebaseUserCredential?.user?.email,
          displayName: firebaseUserCredential.user.displayName,
          photoURL: firebaseUserCredential?.user?.photoURL,
        };
        // Dispatch the user data to Redux (if required)
        dispatch(setUser(firebaseUserCredential.user));
      }
    } catch (error) {
      console.error('Error', 'Failed to sign in with Google', error);
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={[section(0.45, 'column'), styles.headerContainer]}>
        <Text style={styles.welcomeTxt}>Welcome to</Text>
        <Text style={styles.appName}>Maturita Matematka</Text>
        <View style={styles.logoContainer}>
          <Image
            source={Images.Logo}
            resizeMode="contain"
            style={{
              width: 150,
              height: 150,
              borderRadius: 10,
            }}
          />
        </View>
        <Text style={styles.label}>
          Please enter your login details to proceed
        </Text>
      </View>
      <View style={[section(0.5, 'column')]}>
        <Formik
          initialValues={{
            [strings.Email]: '',
            [strings.Password]: '',
          }}
          validationSchema={loginValidationSchema}
          onSubmit={handleLocalSignIn}>
          {({handleChange, handleSubmit, values, errors, touched}) => (
            <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
              <View style={[section(2, 'column'), styles.formContainer]}>
                <AuthInputField
                  placeholder={strings.Email}
                  fieldType="username"
                  onChangeText={handleChange(strings.Email)}
                  value={values[strings.Email]}
                  secureTextEntry={false}
                  errorMessage={errors[strings.Email] || touched[strings.Email]}
                />
                <AuthInputField
                  placeholder={strings.Password}
                  secureTextEntry
                  fieldType="password"
                  onChangeText={handleChange(strings.Password)}
                  value={values[strings.Password]}
                  errorMessage={
                    errors[strings.Password] || touched[strings.Password]
                  }
                />
                <TouchableOpacity>
                  <Text style={styles.forgetPass}>Forget Password?</Text>
                </TouchableOpacity>
                <CustomButton
                  label={'Login'}
                  containerStyle={{
                    width: '70%',
                    alignSelf: 'center',
                    height: '12%',
                  }}
                  onPress={handleSubmit}
                />
                <View style={styles.separator} />
                <CustomButton
                  label={'Sign In With Google'}
                  containerStyle={{
                    width: '80%',
                    alignSelf: 'center',
                    height: '12%',
                  }}
                  onPress={onGoogleButtonPress}
                  lightBtn
                  leftIconEnabled
                />
              </View>
            </KeyboardAvoidingView>
          )}
        </Formik>
        <View style={styles.signUpBtnContainer}>
          <Text style={styles.label}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            <Text
              style={{
                ...styles.label,
                textDecorationLine: 'underline',
                color: Colors.primaryDark,
                fontWeight: '600',
              }}>
              {' '}
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
