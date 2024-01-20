import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import P from '../Text/P';
import React, {useContext} from 'react';
import styles from '../../lib/styles';
import H1 from '../Text/H1';
import H2 from '../Text/H2';
import PyButton from '../PyButton';
import {AppContext} from '../../utils/providers/AppProvider';

const style = StyleSheet.create({
  ...styles,
  welcome: {
    marginTop: 70,
    marginBottom: 10,
  },
  scrollContainer: {
    flexDirection: 'row',
    gap: 10,
    // backgroundColor: 'red',
  },
  scrollItem: {
    flex: 1,
    width: 100,
    paddingHorizontal: 20,
  },
  scrollItemContent: {
    backgroundColor: 'white',
    shadowColor: 'black',
    // shadowOpacity: 0.5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 60,
  },
  btnWrapper: {
    alignItems: 'center',
    paddingHorizontal: 60,
    marginBottom: 20,
    flex: 1,
  },
  btn: {
    width: '100%',
  },
});

export default function Onboarding() {
  const {width} = useWindowDimensions();
  const appContext = useContext(AppContext);

  async function toSignUp() {
    try {
      await appContext.app?.install();
      console.log('- installed');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={[style.wrapper, style.bg]}>
      <View style={style.welcome}>
        <H1 style={style.textCenter}> Welcome </H1>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={style.scrollContainer}
        showsHorizontalScrollIndicator={false}>
        <View style={[style.scrollItem, {width}]}>
          <View style={style.scrollItemContent}>
            {/* <Image source={require('../../assets/images/o1.png')} /> */}
            <H2> Security is our motto </H2>
          </View>
        </View>
        <View style={[style.scrollItem, {width}]}>
          <View style={style.scrollItemContent}>
            <P>Under Construction </P>
          </View>
        </View>
      </ScrollView>

      <View style={style.btnWrapper}>
        <PyButton onPress={toSignUp} style={style.btn} primary>
          Create my account
        </PyButton>
      </View>
    </View>
  );
}
