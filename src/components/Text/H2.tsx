import {StyleSheet, Text, TextProps} from 'react-native';
import React from 'react';

const style = StyleSheet.create({
  h2: {
    fontSize: 25,
    fontWeight: '700',
    color: 'black',
  },
});

export default function H2(props: TextProps): JSX.Element {
  return (
    <Text {...props} style={[style.h2, props.style]}>
      {props.children}
    </Text>
  );
}
