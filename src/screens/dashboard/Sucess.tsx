import React from 'react';
import {StyleSheet, View} from 'react-native';
import styles from '../../lib/styles';
import H1 from '../../components/Text/H1';
import P from '../../components/Text/P';
import PyButton from '../../components/PyButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import screens from '../../lib/screens';
import {Image} from 'react-native';
import {useRoute} from '@react-navigation/native';

const style = StyleSheet.create({
  ...styles,
  successContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
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
  padBottom: {
    marginBottom: 40,
    paddingHorizontal: 40,
  },
});

type IProps = NativeStackScreenProps<any>;
export default function SendSuccess({navigation}: IProps) {
  const route = useRoute<any>();
  const goSetPin = async () => {
    navigation.navigate(screens.SET_PIN);
  };

  return (
    <View style={[style.wrapper, style.bg]}>
      <View style={style.successContainer}>
        <View style={{}}>
          <Image source={require('../../assets/images/o2.png')} />
        </View>
        <View>
          <H1 style={[style.textCenter, style.h1]}>All Done!</H1>
          <View style={style.padText}>
            <P style={[style.textCenter, style.padBottom]}>
              {route.params?.amount} is on it’s way to {route.params.name}
            </P>
          </View>
        </View>

        <View style={style.mBtn}>
          <PyButton style={style.w_100} onPress={goSetPin} primary>
            Continue
          </PyButton>
        </View>
      </View>
    </View>
  );
}
