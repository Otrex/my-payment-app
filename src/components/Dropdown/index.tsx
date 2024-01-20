import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {
  StyleSheet,
  TextProps,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import P from '../Text/P';
import styles from '../../lib/styles';
import PySvg from '../PySvg';

type IProps = {
  options: Array<{label: string; value: any}>;
  onSelect?: (d: any) => void;
  defaultValue?: any;
  selectionStyle?: TextProps['style'];
};

const style = StyleSheet.create({
  ...styles,
  wrapper: {
    // ...styles.dev,
    ...styles.rowCenter,
    justifyContent: 'space-between',
    gap: 5,
    position: 'relative',
  },
  picker: {
    // ...styles.dev,
    position: 'absolute',
    opacity: 0,
    top: 0,
    flex: 1,
    height: 1,
  },
});

export default function Dropdown(props: IProps) {
  const [selectedValue, setSelectedValue] = React.useState(props.defaultValue);
  const picker = React.useRef<any>();

  return (
    <TouchableNativeFeedback
      onPress={() => {
        picker.current.focus();
      }}>
      <View style={style.wrapper}>
        <P style={props.selectionStyle}>{selectedValue}</P>
        <View style={style.itemsCenter}>
          <PySvg name="caret-down" />
        </View>
        <View style={style.picker}>
          <Picker
            ref={picker}
            dropdownIconColor={'transparent'}
            mode="dropdown"
            selectedValue={selectedValue}
            onValueChange={(itemValue, _) => {
              props.onSelect && props.onSelect(itemValue);
              setSelectedValue(itemValue);
            }}>
            {props.options.map((option, idx) => (
              <Picker.Item
                key={idx}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}
