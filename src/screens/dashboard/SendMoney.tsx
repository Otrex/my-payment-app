/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  // TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../../lib/styles';
import H2 from '../../components/Text/H2';
import Avatar from '../../components/PyUi/Avatar';
import PySvg from '../../components/PySvg';
import HeaderCard from '../../components/PyUi/HeaderCard';
import P from '../../components/Text/P';
import {pyColors} from '../../lib/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import screens from '../../lib/screens';

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
  // qrSelectWrapper: {}
  circleBtn: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: pyColors.RUBBISH_BLUE,
  },
  controls: {
    ...styles.rowCenter,
    gap: 10,
  },
  contacts: {
    flex: 1,
  },
  contact: {
    backgroundColor: 'white',
    marginBottom: 15,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    ...styles.rowCenter,
    ...styles.spaceBtw,
  },
});

type IProps = NativeStackScreenProps<any>;
export default function SendMoney({navigation}: IProps) {
  const avatars = [
    {
      src: require('../../assets/images/user.gif'),
    },
    {
      src: require('../../assets/images/user.gif'),
    },
  ];

  const contacts = [
    {name: 'Chidera', source: require('../../assets/images/user.gif')},
    {name: 'Samson', source: require('../../assets/images/user.gif')},
    {name: 'James', source: require('../../assets/images/user.gif')},
    {name: 'Jon', source: require('../../assets/images/user.gif')},
    {name: 'Snow', source: require('../../assets/images/user.gif')},
    {name: 'Chidera', source: require('../../assets/images/user.gif')},
    {name: 'Samson', source: require('../../assets/images/user.gif')},
    {name: 'James', source: require('../../assets/images/user.gif')},
    {name: 'Jon', source: require('../../assets/images/user.gif')},
    {name: 'Snow', source: require('../../assets/images/user.gif')},
  ];

  const goTransfer = () => {
    navigation.navigate(screens.TRANSFER);
  };

  return (
    <View style={[style.cwrapper, style.zeroBottomPad]}>
      <View style={style.header}>
        <H2> Send money </H2>
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
        style={[style.wrapper, style.padTop]}>
        <View>
          <HeaderCard options={[]} />
        </View>
        {/* <View>
          <TouchableNativeFeedback>
            <View style={style.qrSelectWrapper}>

            </View>
          </TouchableNativeFeedback>
        </View> */}
        <View style={[style.rowCenter, style.spaceBtw, style.py_1]}>
          <P style={style.bold}>Favorites</P>
          {/* <TouchableOpacity>
            <P style={style.bold}> See all</P>
          </TouchableOpacity> */}
        </View>
        <View style={style.controls}>
          <TouchableOpacity>
            <View style={style.circleBtn}>
              <PySvg name="search" />
            </View>
          </TouchableOpacity>
          {avatars.map((a, idx) => (
            <TouchableOpacity key={idx}>
              <Avatar source={a.src} width={50} />
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={goTransfer}>
            <View style={style.circleBtn}>
              <PySvg name="plus-circle" />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={[style.rowCenter, style.spaceBtw, style.py_1, {marginTop: 5}]}>
          <P style={style.bold}>Contact</P>
          {/* <TouchableOpacity>
            <P style={style.bold}> See all</P>
          </TouchableOpacity> */}
        </View>
        {/* <View style={style.contacts}> */}
        <ScrollView>
          <FlatList
            data={contacts}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => goTransfer()}>
                <View style={style.contact}>
                  <View style={[style.rowCenter, {gap: 7}]}>
                    <Avatar source={item.source} width={40} />
                    <P style={style.bold}>{item.name}</P>
                  </View>
                  <View>
                    <PySvg name="arrow-right" />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
        {/* </View> */}
      </ScrollView>
    </View>
  );
}
