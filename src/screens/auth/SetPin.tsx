import React from 'react';
import {StyleSheet, View} from 'react-native';
import styles from '../../lib/styles';
import H1 from '../../components/Text/H1';
import P from '../../components/Text/P';
import PyButton from '../../components/PyButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import screens from '../../lib/screens';
import BackButton from '../../components/PyButton/BackButton';
import Keypad, {updater} from '../../components/Keypad';
import OtpPadInput from '../../components/PyInput/OtpPadInput';

const style = StyleSheet.create({
  ...styles,
  padX: {
    paddingHorizontal: 20,
    // paddingTop: 10,
    flex: 1,
  },
  padXX: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  inputWrapper: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  h1: {
    marginTop: 25,
    marginBottom: 10,
  },
  padText: {
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  mBtn: {
    marginTop: 10,
    marginBottom: 40,
  },
  otpWrapper: {
    gap: 10,
    marginHorizontal: 30,
  },
  link: {
    paddingVertical: 10,
  },
  keypadHolder: {
    // paddingVertical: 20,
  },
  otpInput: {
    borderColor: '#E5E5E5',
    borderRadius: 20,
    borderWidth: 4,
    borderStyle: 'solid',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

type IProps = NativeStackScreenProps<any>;
export default function SetPin({navigation}: IProps) {
  const [pin, $setPin] = React.useState(Array(4).fill(undefined));
  const onUpdate = updater($setPin);

  const setPin = async () => {
    navigation.replace('Auth');
  };

  return (
    <View style={[style.wrapper, style.bg]}>
      <View style={style.itemsStart}>
        <BackButton />
      </View>
      <View style={style.padX}>
        <View>
          <H1 style={[style.textCenter, style.h1]}>Set your PIN</H1>
          <View style={style.padText}>
            <P style={style.textCenter}>You'll use this to login next time</P>
          </View>
        </View>
        <View style={style.inputWrapper}>
          <OtpPadInput value={pin} />
        </View>
        <View style={style.keypadHolder}>
          <Keypad keyStyle={[style.bg]} onPress={onUpdate} />
        </View>
        <View style={style.mBtn}>
          <PyButton
            disabled={!pin.filter(e => e !== undefined).length}
            style={style.w_100}
            onPress={setPin}
            primary>
            Verify my account
          </PyButton>
        </View>
      </View>
    </View>
  );
}
