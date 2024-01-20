import {StyleSheet, Text, TextProps} from 'react-native';
import React from 'react';

const style = StyleSheet.create({
  p: {
    fontSize: 16,
    color: 'black',
  },
});

export default function P(props: TextProps): JSX.Element {
  return (
    <Text {...props} style={[style.p, props.style]}>
      {props.children}
    </Text>
  );
}
