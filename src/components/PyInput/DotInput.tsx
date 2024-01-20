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
    // backgroundColor: 'red',
  },
  inputText: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 6,
    marginVertical: 5,
  },
});

export default function DotInput({value}: {value: string[]}) {
  return (
    <View style={[style.itemsCenter, style.inputDotWrapper]}>
      {value.map((e, idx) => (
        <View style={style.itemsCenter} key={idx}>
          {e !== undefined ? (
            <P style={style.inputText}>{e}</P>
          ) : (
            <View key={e} style={style.inputDot} />
          )}
        </View>
      ))}
    </View>
  );
}
