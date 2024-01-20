import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import screens from '../../lib/screens';
import PySvg from '../PySvg';
import svgStrings from '../PySvg/svg-strings';
import styles from '../../lib/styles';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {AppContext} from '../../utils/providers/AppProvider';

const IconMap: Record<string, keyof typeof svgStrings> = {
  [screens.HOME]: 'home',
  [screens.SEND_MONEY]: 'transfer',
  [screens.MENU]: 'menu',
  [screens.WALLET]: 'wallet',
};

const NORMALCOLOR = '#111111';
const ACTIVECOLOR = '#34DD5A';

const style = StyleSheet.create({
  ...styles,
  container: {
    // ...styles.dev,
    ...styles.shadowContainer,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    borderRadius: 50,
    backgroundColor: 'white',
    marginHorizontal: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-around',
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 10,
  },
});

export default function MyTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const context = React.useContext(AppContext);

  if (!context.showTab) {
    return null;
  }

  return (
    <View style={style.container}>
      {state.routes.map(
        (route: {key: string | number; name: any}, index: any) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key as any,
              canPreventDefault: true,
            });
            // console.log(route, descriptors);
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key as any,
              // canPreventDefault: true,
            });
          };

          // setShow(() => !!!IconMap[label]);

          return IconMap[label] ? (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={style.wrapper}>
              <View style={style.tab}>
                <PySvg
                  name={IconMap[label]}
                  color={isFocused ? ACTIVECOLOR : NORMALCOLOR}
                />
              </View>
            </TouchableOpacity>
          ) : null;
        },
      )}
    </View>
  );
}
