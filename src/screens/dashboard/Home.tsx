import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import styles from '../../lib/styles';
import H2 from '../../components/Text/H2';
import Avatar from '../../components/PyUi/Avatar';
import PySvg from '../../components/PySvg';
import HeaderCard from '../../components/PyUi/HeaderCard';
import P from '../../components/Text/P';
import {TransactionType} from '../../dtos/enums';
import TransactionCard from '../../components/PyUi/TransactionCard';
import AnalyticsCard from '../../components/PyUi/AnalyticsCard';

const style = StyleSheet.create({
  ...styles,
  imgWrapper: {
    borderRadius: 50,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  userNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  notice: {
    padding: 10,
  },
  padTop: {
    marginTop: 20,
  },
  zeroBottomPad: {
    paddingBottom: 0,
  },
  padBottom: {paddingBottom: 20},
});

export default function Home() {
  const headerOptions: any[] = [
    {
      label: 'Add Money',
      action: () => {},
    },
    {
      label: 'Send Money',
      action: () => {},
    },
  ];

  const transactions = [
    {
      type: TransactionType.DEBIT,
      label: 'Apple.com',
      currency: 'NGN',
      amount: 160000,
    },
    {
      type: TransactionType.CREDIT,
      label: 'Pedro Lee',
      currency: 'NGN',
      amount: 10000000,
    },
    {
      type: TransactionType.DEBIT,
      label: 'Google',
      currency: 'NGN',
      amount: 760000,
    },
  ];

  return (
    <View style={[style.cwrapper, style.zeroBottomPad]}>
      <View style={style.header}>
        <H2> Your Account </H2>
        <View style={style.userNotice}>
          <TouchableOpacity style={style.notice}>
            <PySvg name="notification" />
          </TouchableOpacity>
          <Avatar
            source={require('../../assets/images/user.gif')}
            defaultSource={require('../../assets/images/user.gif')}
            width={50}
          />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={true}
        style={[style.wrapper, style.padTop]}>
        <View>
          <HeaderCard options={headerOptions} />
        </View>
        <View style={[style.rowCenter, style.spaceBtw, style.py_1]}>
          <P style={style.bold}>Transactions</P>
          <TouchableOpacity>
            <P style={style.bold}> See all</P>
          </TouchableOpacity>
        </View>
        <View>
          {transactions.map((item, idx) => (
            <TransactionCard key={idx} trx={item} />
          ))}
        </View>
        <View style={[style.rowCenter, style.spaceBtw, style.py_1]}>
          <P style={style.bold}>Analytics</P>
          <TouchableOpacity>
            <P style={style.bold}> See all</P>
          </TouchableOpacity>
        </View>
        <View style={style.rowCenter}>
          <View style={style.padBottom}>
            <AnalyticsCard currency={'NGN'} amount={6000} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
