import React from 'react';
import styles from '../../lib/styles';
import {StyleSheet, View} from 'react-native';
import {TransactionType} from '../../dtos/enums';
import PySvg from '../PySvg';
import P from '../Text/P';
import {formatCurrency} from '../../utils';
type IProps = {
  trx: {
    type: TransactionType;
    label: string;
    amount: number;
    currency: string;
  };
};

const style = StyleSheet.create({
  ...styles,
  container: {
    ...styles.rowCenter,
    width: '100%',
    backgroundColor: 'white',
    paddingRight: 20,
    paddingLeft: 10,
    borderRadius: 6,
    paddingVertical: 5,
    marginBottom: 10,
  },
  icon: {
    padding: 10,
  },
});

export default function TransactionCard({trx}: IProps) {
  return (
    <View style={style.container}>
      <View style={style.icon}>
        {trx.type === TransactionType.CREDIT ? (
          <PySvg name="credit" />
        ) : (
          <PySvg name="debit" />
        )}
      </View>
      <View style={[style.rowCenter, style.spaceBtw, style.wrapper]}>
        <View>
          <P style={style.bold}>{trx.label}</P>
        </View>
        <View>
          <P
            style={
              trx.type === TransactionType.CREDIT
                ? style.textGreen
                : style.textRed
            }>
            {trx.type === TransactionType.CREDIT ? '+' : '-'}
            {formatCurrency(trx.currency, trx.amount)}
          </P>
        </View>
      </View>
    </View>
  );
}
