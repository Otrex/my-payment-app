import React from 'react';
import {Image, ImageProps, StyleSheet, View} from 'react-native';
import styles from '../../lib/styles';

const style = StyleSheet.create({
  ...styles,
  imgWrapper: {
    borderRadius: 50,
    overflow: 'hidden',
  },
});

type IProps = ImageProps & {width?: number};
export default function Avatar(props: IProps) {
  const $width = props.width || 100;
  return (
    <View
      style={[
        style.imgWrapper,
        {width: $width, borderRadius: Math.ceil($width / 2)},
      ]}>
      <Image
        source={props.source}
        defaultSource={props.defaultSource}
        style={{
          width: $width,
          height: $width,
        }}
      />
    </View>
  );
}
