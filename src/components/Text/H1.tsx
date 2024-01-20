import {StyleSheet, Text, TextProps} from 'react-native';
import React from 'react';

const style = StyleSheet.create({
  h1: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default function H1(props: TextProps): JSX.Element {
  return (
    <Text {...props} style={[style.h1, props.style]}>
      {props.children}
    </Text>
  );
}
