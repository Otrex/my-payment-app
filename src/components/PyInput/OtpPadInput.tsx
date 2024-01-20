import React from 'react';
import {StyleSheet, View} from 'react-native';
import P from '../Text/P';
import styles from '../../lib/styles';

const style = StyleSheet.create({
  ...styles,
  inputDot: {
    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 50,
    marginVertical: 14,
  },
  inputDotWrapper: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  inputText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'blue',
  },
  otpInput: {
    borderColor: '#E5E5E5',
    borderRadius: 20,
    borderWidth: 4,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    borderStyle: 'solid',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default function OtpPadInput({value}: {value: string[]}) {
  const [input, setInput] = React.useState<(string | undefined)[]>([]);

  React.useEffect(() => {
    setInput(() => {
      return value.map((v, idx) => {
        if (v !== undefined && value[idx + 1] && value[idx + 1] !== undefined) {
          return '*';
        }
        return v;
      });
    });
  }, [value]);

  return (
    <View style={[style.itemsCenter, style.inputDotWrapper]}>
      {input.map((e, idx) => (
        <View style={style.itemsCenter} key={idx}>
          <View style={style.otpInput}>
            <P style={style.inputText}>{e}</P>
          </View>
        </View>
      ))}
    </View>
  );
}
