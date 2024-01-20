import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import styles from '../../lib/styles';
import H1 from '../../components/Text/H1';
import P from '../../components/Text/P';
import PyButton from '../../components/PyButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import screens from '../../lib/screens';
import {useRoute} from '@react-navigation/native';
import OtpInput from '../../components/PyInput/Otp';

const style = StyleSheet.create({
  ...styles,
  padX: {
    paddingHorizontal: 20,
    paddingTop: 60,
    flex: 1,
  },
  padXX: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  inputWrapper: {
    flex: 1,
    // backgroundColor: 'red',
  },
  terms: {
    paddingHorizontal: 20,
    textAlign: 'center',
    paddingTop: 10,
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
  otpWrapper: {
    gap: 10,
  },
  link: {
    paddingVertical: 10,
  },
  otpInput: {
    borderBottomColor: 'grey',
    borderBottomWidth: 4,
    borderStyle: 'solid',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

type IProps = NativeStackScreenProps<any>;
export default function VerifyAccount({navigation}: IProps) {
  const [otp, setOtp] = React.useState<string>();

  const route = useRoute<any>();
  const verify = async () => {
    navigation.navigate(screens.AUTH_SUCCESS);
  };

  const resend = async () => {};

  return (
    <View style={[style.wrapper, style.bg]}>
      <View style={style.padX}>
        <View>
          <H1 style={[style.textCenter, style.h1]}>Verify Account</H1>
          <View style={style.padText}>
            <P style={style.textCenter}>
              Please enter the code we have sent to:
            </P>
            <P style={[style.textCenter, style.textGreen]}>
              {route.params?.phoneNumber}
            </P>
          </View>
        </View>
        <View style={style.inputWrapper}>
          <OtpInput
            onOtpChange={v => setOtp(() => v)}
            wrapperStyle={style.otpWrapper}
            inputStyle={{
              ...style.otpInput,
            }}
          />
          <View style={style.padXX}>
            <P style={style.textCenter}>Didn't receive a code?</P>
            <TouchableOpacity style={style.link} onPress={resend}>
              <P style={[style.textCenter, style.textGreen]}>Resend Code</P>
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.mBtn}>
          <PyButton
            disabled={!otp}
            style={style.w_100}
            onPress={verify}
            primary>
            Verify my account
          </PyButton>
          <P style={style.terms}>
            By clicking start, you agree to our{' '}
            <P style={style.textGreen}>Privacy Policy</P> and
            <P style={style.textGreen}> Terms and Conditions</P>
          </P>
        </View>
      </View>
    </View>
  );
}
