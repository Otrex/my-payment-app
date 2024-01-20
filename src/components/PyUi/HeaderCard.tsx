import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import styles from '../../lib/styles';
import P from '../Text/P';
import Dropdown from '../Dropdown';
import H2 from '../Text/H2';
import {formatCurrency} from '../../utils';
import PySvg from '../PySvg';

const style = StyleSheet.create({
  ...styles,
  container: {
    ...styles.shadowContainer2,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  balanceOption: {
    // ...styles.dev,
    ...styles.rowCenter,
    justifyContent: 'flex-end',
  },
  lowOpacity: {
    opacity: 0.4,
  },
  padTop: {marginTop: 10},
  tagContainer: {
    backgroundColor: '#C2BDFD',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
  },
  tagBox: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  tagText: {
    fontWeight: 'bold',
    color: '#4E64DE',
  },
});

type IProps = {
  options: {label: string; action: Function}[];
};

export default function HeaderCard({options}: IProps) {
  const [selectedCurrency, setSelectedCurrency] = React.useState<string>('NGN');
  const [isVisible, setVisibility] = React.useState(true);

  const dropdownOptions = ['NGN', 'USD'].map(e => ({label: e, value: e}));

  return (
    <View style={style.container}>
      <View style={style.balanceOption}>
        <Dropdown
          selectionStyle={style.bold}
          options={dropdownOptions}
          defaultValue={'NGN'}
          onSelect={d => setSelectedCurrency(d)}
        />
      </View>
      <View style={[style.rowCenter, style.spaceBtw, style.padTop]}>
        <View>
          <P style={style.bold}>Balance</P>
          <H2>
            {isVisible
              ? formatCurrency(selectedCurrency, 70000)
              : `${selectedCurrency} *******`}
          </H2>
        </View>
        <TouchableHighlight onPress={() => setVisibility(!isVisible)}>
          <PySvg name="eye" style={!isVisible && style.lowOpacity} />
        </TouchableHighlight>
      </View>
      {options.length ? (
        <View style={style.tagBox}>
          {options.map((option, idx) => (
            <TouchableNativeFeedback key={idx} onPress={() => option.action()}>
              <View style={style.tagContainer}>
                <P style={style.tagText}> {option.label} </P>
              </View>
            </TouchableNativeFeedback>
          ))}
        </View>
      ) : null}
    </View>
  );
}
