import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import CountryPicker, {Country} from 'react-native-country-picker-modal';

const PyPhoneInput = (props: PhoneInput['props']) => {
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const phone = React.useRef<PhoneInput>(null);

  const onSelectCountry = (country: Country) => {
    phone.current?.selectCountry(country.cca2.toLowerCase());
    setCountryPickerVisible(false);
  };

  const toggleCountryPicker = () => {
    setCountryPickerVisible(!countryPickerVisible);
  };

  return (
    <View style={styles.container}>
      <PhoneInput
        ref={phone}
        initialCountry={'ng'}
        initialValue={props.initialValue}
        onChangePhoneNumber={(number, idc) =>
          props.onChangePhoneNumber && props.onChangePhoneNumber(number, idc)
        }
        onPressFlag={toggleCountryPicker}
        style={styles.phoneInput}
        textProps={{
          style: {color: 'black', fontWeight: 'bold', fontSize: 16},
          placeholder: 'Enter a phone number...',
        }}
      />
      {countryPickerVisible && (
        <CountryPicker
          withFilter={true}
          withFlagButton={false}
          withCountryNameButton={false}
          onSelect={onSelectCountry}
          onClose={() => setCountryPickerVisible(false)}
          visible={countryPickerVisible}
          // containerButtonStyle={styles.countryPickerButton}
          countryCode={'NG'}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: 20,
  },
  phoneInput: {
    height: 60,
    width: '100%',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#ccc',
    color: 'black',
    // marginBottom: 20,
    paddingHorizontal: 25,
  },
  countryPickerCloseButton: {
    width: 20,
    height: 20,
  },
});

export default PyPhoneInput;
