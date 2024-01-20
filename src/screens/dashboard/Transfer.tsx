import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import styles from '../../lib/styles';
import BackButton from '../../components/PyButton/BackButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import screens from '../../lib/screens';
import PyButton from '../../components/PyButton';
import Keypad from '../../components/Keypad';
import {formatCurrency} from '../../utils';
import P from '../../components/Text/P';

const style = StyleSheet.create({
  ...styles,
  mBtn: {
    marginTop: 10,
    marginBottom: 40,
  },
  inputWrapper: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    marginHorizontal: 30,
  },
  input: {
    fontSize: 45,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  transfer: {
    flex: 1,
    textAlign: 'center',
    fontSize: 25,
  },
});

type IProps = NativeStackScreenProps<any>;
export default function Transfer({navigation}: IProps) {
  const [input, setInput] = React.useState('');

  const send = () => {
    navigation.navigate(screens.SEND_SUCCESS, {
      amount: formatCurrency('NGN', +input),
      name: 'Chidera',
    });
  };

  return (
    <View style={style.wrapper}>
      <View style={[style.itemsStart, style.rowCenter, style.py_1]}>
        <BackButton onPress={() => navigation.navigate(screens.SEND_MONEY)} />
        <P style={[style.transfer]}>Transfer</P>
        <View style={style.zeroOpacity}>
          <BackButton onPress={() => {}} />
        </View>
      </View>
      <View style={[style.cwrapper, style.spaceBtw]}>
        <View style={style.inputWrapper}>
          <TextInput
            value={formatCurrency('NGN', +input)}
            editable={false}
            style={style.input}
          />
        </View>
        <View>
          <P style={style.textCenter}>Sending to Chidera</P>
        </View>
        <View>
          <Keypad
            keyStyle={[style.bg]}
            onPress={d => setInput(e => (d === '<' ? e.slice(0, -1) : e + d))}
          />
        </View>
        <View style={style.mBtn}>
          <PyButton
            // disabled={!phoneNumber}
            style={style.w_100}
            onPress={send}
            primary>
            Send
          </PyButton>
        </View>
      </View>
    </View>
  );
}
