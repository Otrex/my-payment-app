import React from 'react';
import styles from '../../lib/styles';
import {StyleSheet, View} from 'react-native';
import H1 from '../../components/Text/H1';
import P from '../../components/Text/P';
import Keypad, {updater} from '../../components/Keypad';
import DotInput from '../../components/PyInput/DotInput';

const style = StyleSheet.create({
  ...styles,
  h1: {
    marginTop: 70,
    marginBottom: 25,
    fontWeight: '300',
  },
  headerP: {
    textTransform: 'uppercase',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 30,
  },
  otpInput: {
    aspectRatio: 1,
    width: 40,
    flex: undefined,
    borderRadius: 23,
    textAlign: 'center',
  },
  otpWrapper: {
    // justifyContent: 'space-between',
    gap: 5,
  },
  keyPadWrapper: {
    flex: 1,
    paddingBottom: 70,
    backgroundColor: 'white',
  },
});

export default function Login() {
  const [pin, setPin] = React.useState(Array(6).fill(undefined));
  const onUpdate = updater(setPin);

  return (
    <View style={[style.wrapper, style.bg]}>
      <View style={style.wrapper}>
        <H1 style={[style.textCenter, style.h1]}>Mobile Number</H1>
        <P style={style.headerP}>Enter Your Pin</P>
        <View style={style.itemsCenter}>
          <DotInput value={pin} />
        </View>
      </View>
      <View style={style.keyPadWrapper}>
        <Keypad onPress={onUpdate} />
      </View>
    </View>
  );
}
