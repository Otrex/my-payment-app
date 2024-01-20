import React from 'react';
import {StyleSheet, View} from 'react-native';
import PyPhoneInput from '../../components/PyInput/Phone';
import styles from '../../lib/styles';
import H1 from '../../components/Text/H1';
import P from '../../components/Text/P';
import PyButton from '../../components/PyButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import screens from '../../lib/screens';

const style = StyleSheet.create({
  ...styles,
  padX: {
    paddingHorizontal: 20,
    paddingTop: 60,
    flex: 1,
  },
  inputWrapper: {
    flex: 1,
    // backgroundColor: 'red',
  },
  h1: {
    marginVertical: 25,
  },
  padText: {
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  mBtn: {
    marginBottom: 40,
  },
});

type IProps = NativeStackScreenProps<any>;
export default function Signup({navigation}: IProps) {
  const [phoneNumber, setPhoneNumber] = React.useState<string>();

  const sendCode = async () => {
    // navigation.navigate(screens.VERIFY_ACCOUNT, {phoneNumber});
    navigation.navigate('Auth', {
      screen: screens.SCAN_QR,
    });
  };

  return (
    <View style={[style.wrapper, style.bg]}>
      <View style={style.padX}>
        <View>
          <H1 style={[style.textCenter, style.h1]}>Mobile Number</H1>
          <View style={style.padText}>
            <P style={style.textCenter}>Please enter your valid phone number</P>
            <P style={style.textCenter}>
              We will send you a 4-digit code to verify account
            </P>
          </View>
        </View>
        <View style={style.inputWrapper}>
          <PyPhoneInput
            onChangePhoneNumber={number => setPhoneNumber(number)}
            initialValue={phoneNumber}
          />
        </View>
        <View style={style.mBtn}>
          <PyButton
            disabled={!phoneNumber}
            style={style.w_100}
            onPress={sendCode}
            primary>
            Send code
          </PyButton>
        </View>
      </View>
    </View>
  );
}
