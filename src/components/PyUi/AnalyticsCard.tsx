import React from 'react';
import H2 from '../Text/H2';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {formatCurrency} from '../../utils';
import {LineChart} from 'react-native-chart-kit';
import styles from '../../lib/styles';

type IProps = {
  currency: string;
  amount: number;
};

const style = StyleSheet.create({
  ...styles,
  imgWrapper: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  container: {
    borderRadius: 15,
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  pad: {
    paddingHorizontal: 20,
  },
});

export default function AnalyticsCard(props: IProps) {
  const dim = useWindowDimensions();
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Earnings'], // optional
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: 'white',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View style={style.container}>
      <H2 style={style.pad}>{formatCurrency(props.currency, props.amount)}</H2>
      <View>
        <LineChart
          data={data}
          width={dim.width - 40}
          height={200}
          verticalLabelRotation={30}
          chartConfig={chartConfig}
          bezier
        />
      </View>
    </View>
  );
}
