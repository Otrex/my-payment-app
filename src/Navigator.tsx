/* eslint-disable react/no-unstable-nested-components */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import screens from './lib/screens';
import Signup from './screens/auth/Signup';
import Login from './screens/auth/Login';
import VerifyAccount from './screens/auth/VerifyAccount';
import AuthSuccess from './screens/auth/Sucess';
import SetPin from './screens/auth/SetPin';
import Home from './screens/dashboard/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTabBar from './components/PyUi/ButtonTab';
import SendMoney from './screens/dashboard/SendMoney';
import Wallet from './screens/dashboard/Wallet';
import Menu from './screens/dashboard/Menu';
import Transfer from './screens/dashboard/Transfer';
import {AppContext} from './utils/providers/AppProvider';
import SendSuccess from './screens/dashboard/Sucess';
import ScanQRCode from './screens/dashboard/ScanQRCode';

const Root = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const context = React.useContext(AppContext);

  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      screenListeners={({route}) => ({
        state: _ => {
          context.setShowTab(true);
          if ([screens.TRANSFER, screens.SEND_SUCCESS].includes(route.name)) {
            context.setShowTab(false);
          }
        },
      })}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name={screens.HOME} component={Home} />
      <Tab.Screen name={screens.SEND_MONEY} component={SendMoney} />
      <Tab.Screen name={screens.WALLET} component={Wallet} />
      <Tab.Screen name={screens.MENU} component={Menu} />
      <Tab.Screen name={screens.TRANSFER} component={Transfer} />
      <Tab.Screen name={screens.SEND_SUCCESS} component={SendSuccess} />
      <Tab.Screen name={screens.SCAN_QR} component={ScanQRCode} />
      {/* <Tab.Screen name={'G'} component={Menu} /> */}
    </Tab.Navigator>
  );
};

export default function Navigator() {
  return (
    <NavigationContainer>
      <Root.Navigator
        screenListeners={({route}) => ({
          state: e => {
            console.log('state changed', e, route.name);
          },
        })}
        screenOptions={{headerShown: false}}
        initialRouteName={screens.SIGNUP}>
        <Root.Group
          screenOptions={{headerShown: false}}
          navigationKey={'guest'}>
          <Root.Screen name={screens.LOGIN} component={Login} />
          <Root.Screen name={screens.SIGNUP} component={Signup} />
          <Root.Screen
            name={screens.VERIFY_ACCOUNT}
            component={VerifyAccount}
          />
          <Root.Screen name={screens.SET_PIN} component={SetPin} />
          <Root.Screen name={screens.AUTH_SUCCESS} component={AuthSuccess} />
          <Root.Screen name={'Auth'} component={TabNavigator} />
        </Root.Group>
      </Root.Navigator>
    </NavigationContainer>
  );
}
