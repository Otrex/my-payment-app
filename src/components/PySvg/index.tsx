import React from 'react';
import {SvgXml} from 'react-native-svg';
import {View, ViewProps} from 'react-native';
import svgStrings from './svg-strings';

export default function PySvg(
  props: ViewProps & {name: keyof typeof svgStrings; color?: string},
) {
  const {name, color, ...others} = props;
  return (
    <View {...others}>
      {svgStrings[name] instanceof Function ? (
        <SvgXml xml={(svgStrings[name] as any)(color)} />
      ) : (
        <SvgXml xml={svgStrings[name] as string} />
      )}
    </View>
  );
}
