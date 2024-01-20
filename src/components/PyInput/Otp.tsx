/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {ThemeInjector} from '../../utils/providers/ThemeProvider';

type OTPProps = {
  length?: number;
  onOtpChange?: (value: string) => void;
  wrapperStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  inputCount?: number;
  onChange?: (value: string) => void;
  onCompleted?: (value: string) => void;
} & TextInputProps;

const OtpInput = ThemeInjector<OTPProps>(
  ({
    length = 4,
    $theme,
    inputStyle,
    onCompleted,
    wrapperStyle,
    onOtpChange,
  }) => {
    const [otp, setOtp] = useState('');
    const inputRefs = useRef<(TextInput | null)[]>([]);

    const handleChange = (value: string, index: number) => {
      const newOtp = otp.split('');
      newOtp[index] = value;
      setOtp(newOtp.join(''));

      if (onOtpChange && typeof onOtpChange === 'function') {
        onOtpChange(newOtp.join(''));
      }

      // Move focus to the next input
      if (value && index < length - 1) {
        inputRefs.current[index + 1]!.focus();
      }

      // Handle completed
      if (newOtp.join('').length === length) {
        onCompleted && onCompleted(newOtp.join(''));
      }
    };

    const handleKeyPress = (e: any, index: number) => {
      if (e.nativeEvent.key === 'Backspace') {
        const newOtp = otp.split('');
        newOtp[index] = '';
        setOtp(newOtp.join(''));

        if (onOtpChange && typeof onOtpChange === 'function') {
          onOtpChange(newOtp.join(''));
        }

        // Move focus to the previous input
        if (index > 0) {
          inputRefs.current[index - 1]!.focus();
        }
      }
    };

    const renderInputs = () => {
      const inputs = [];
      for (let i = 0; i < length; i++) {
        inputs.push(
          <TextInput
            key={i}
            style={{
              flex: 1,
              fontWeight: '700',
              color: 'black',
              ...((inputStyle as any) || {}),
              ...(otp.length === length && i === length - 1
                ? {backgroundColor: $theme.accent, color: $theme.grey500}
                : {}),
            }}
            keyboardType="numeric"
            maxLength={1}
            value={otp[i] || ''}
            onChangeText={value => handleChange(value, i)}
            onKeyPress={e => handleKeyPress(e, i)}
            ref={ref => (inputRefs.current[i] = ref)}
          />,
        );
      }
      return inputs;
    };

    return (
      <View style={{...((wrapperStyle as any) || {}), flexDirection: 'row'}}>
        {renderInputs()}
      </View>
    );
  },
);

export default OtpInput;
// Rest of the code remains the same
