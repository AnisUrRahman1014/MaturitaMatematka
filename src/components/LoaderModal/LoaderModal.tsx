import {StyleSheet, View} from 'react-native';
import React from 'react';
import LoaderKit from 'react-native-loader-kit';
import {Colors} from '../../utils/System/Constants';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

type Props = {
  visible: boolean;
};

const LoaderModal = (props: Props) => {
  return (
    <>
      {props.visible && (
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <LoaderKit
              style={{width: 50, height: 50}}
              name={'LineScale'} // Optional: see list of animations below
              color={Colors.primaryDark} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
            />
          </View>
        </View>
      )}
    </>
  );
};

export default LoaderModal;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 9999,
  },
  innerContainer: {
    top: moderateVerticalScale(-20),
    backgroundColor: Colors.white,
    width: '50%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(20, 0.3),
    shadowOpacity: 0.5,
    shadowRadius: 200,
    elevation: 2,
    borderColor: Colors.primaryLight,
  },
});
