import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import P from '../Text/P';

interface IPyButtonProps {
  primary?: boolean;
}

const style = StyleSheet.create({
  primary: {
    backgroundColor: '#2AD23B', //green
    paddingVertical: 15,
    borderRadius: 10,
  },
  primaryText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
  disabled: {
    opacity: 0.6,
  },
});

export default function PyButton(
  props: TouchableOpacityProps & IPyButtonProps,
) {
  if (props.primary) {
    return (
      <TouchableOpacity
        {...props}
        style={[style.primary, props.style, props.disabled && style.disabled]}>
        <P style={style.primaryText}> {props.children} </P>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity>
      <P> {props.children} </P>
    </TouchableOpacity>
  );
}
