import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import P from '../Text/P';
import React from 'react';
import PySvg from '../PySvg';

const style = StyleSheet.create({
  key: {
    backgroundColor: 'white',
    // borderColor: 'red',
    // borderWidth: 3,
    // borderStyle: 'solid',
    flex: 1,
  },
  keyText: {
    fontWeight: '700',
    fontSize: 30,
    textAlign: 'center',
    padding: 30,
  },
  keyWrapper: {
    // flexWrap: 'wrap',
    flexDirection: 'row',
  },
});

type IKeysProps = {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  children: any;
  style?: StyleProp<ViewProps>;
};

export const updater =
  (setValue: React.Dispatch<React.SetStateAction<(string | undefined)[]>>) =>
  (d: string) => {
    setValue(e => {
      const arr = [...e];
      for (let i = 0; i < e.length; i++) {
        const flip = e.length - i - 1;

        if (d === '<' && flip !== -1 && arr[flip] !== undefined) {
          arr[flip] = undefined;
          break;
        }
        if (arr[i] === undefined && d !== '<') {
          arr[i] = d;
          break;
        }
      }

      return arr;
    });
  };

const Key = (props: IKeysProps): JSX.Element => {
  return (
    <TouchableOpacity onPress={props.onPress} style={[style.key, props.style]}>
      <View>{props.children}</View>
    </TouchableOpacity>
  );
};

type KeypadProps = {
  keyStyle?: any;
  onPress?: (v: any) => any;
};

export default function Keypad({onPress, keyStyle}: KeypadProps) {
  return (
    <View>
      <View style={style.keyWrapper}>
        <Key style={keyStyle} onPress={() => onPress && onPress('1')}>
          <P style={style.keyText}>1</P>
        </Key>
        <Key style={keyStyle} onPress={() => onPress && onPress('2')}>
          <P style={style.keyText}>2</P>
        </Key>
        <Key style={keyStyle} onPress={() => onPress && onPress('3')}>
          <P style={style.keyText}>3</P>
        </Key>
      </View>
      <View style={style.keyWrapper}>
        <Key style={keyStyle} onPress={() => onPress && onPress('4')}>
          <P style={style.keyText}>4</P>
        </Key>
        <Key style={keyStyle} onPress={() => onPress && onPress('5')}>
          <P style={style.keyText}>5</P>
        </Key>
        <Key style={keyStyle} onPress={() => onPress && onPress('6')}>
          <P style={style.keyText}>6</P>
        </Key>
      </View>
      <View style={style.keyWrapper}>
        <Key style={keyStyle} onPress={() => onPress && onPress('7')}>
          <P style={style.keyText}>7</P>
        </Key>
        <Key style={keyStyle} onPress={() => onPress && onPress('8')}>
          <P style={style.keyText}>8</P>
        </Key>
        <Key style={keyStyle} onPress={() => onPress && onPress('9')}>
          <P style={style.keyText}>9</P>
        </Key>
      </View>
      <View style={style.keyWrapper}>
        <Key style={keyStyle} onPress={() => onPress && onPress(',')}>
          <P style={style.keyText}>,</P>
        </Key>
        <Key style={keyStyle} onPress={() => onPress && onPress('0')}>
          <P style={style.keyText}>0</P>
        </Key>
        <Key style={keyStyle} onPress={() => onPress && onPress('<')}>
          <P style={style.keyText}>
            <PySvg name="backspace" />
          </P>
        </Key>
      </View>
    </View>
  );
}
