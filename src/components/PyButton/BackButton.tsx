import React from 'react';
import {
  StyleSheet,
  TouchableHighlightProps,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import PySvg from '../PySvg';
import {useNavigation} from '@react-navigation/native';

const style = StyleSheet.create({
  btn: {
    padding: 20,
    // backgroundColor: 'red',
  },
});

type IProps = {
  onPress?: TouchableHighlightProps['onPress'];
};

export default function BackButton(props: IProps) {
  const navigation = useNavigation();
  return (
    <TouchableNativeFeedback
      onPress={props.onPress ? props.onPress : () => navigation.goBack()}>
      <View style={style.btn}>
        <PySvg name="chevron-left" />
      </View>
    </TouchableNativeFeedback>
  );
}
