import React, { useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import { SafeAreaView, Header } from '@components';
import { useDebounce } from 'app/hooks/useDebounce';
import SearchBarWithAutocomplete from 'app/components/SearchBarWithAutocomplete';
import { AUTO_COMPLETE_API_BASE_URL, DETAIL_API_BASE_URL } from './constants';
import { Icon } from '@components';
import { updateBookingAddressById } from '@services/bookingService';
import { Button, useTheme } from 'react-native-elements';
import i18next from 'i18next';
import _ from 'lodash';

const SavePlace = props => {
  const { theme } = useTheme();
  const { navigation, route } = props;
  const { googleLocation, bookingCategory, bookingData } = route.params;

  const [search, setSearch] = React.useState({
    term: '',
    fetchPredictions: false,
  });
  const [predictions, setPredictions] = React.useState([]);
  const [showPredictions, setShowPredictions] = React.useState(false);
  const [location, setLocation] = React.useState({});
  const [note, setNote] = React.useState('');

  React.useEffect(() => {
    if (googleLocation !== undefined) {
      setShowPredictions(false);
      setSearch({ term: googleLocation?.address });
      setLocation(googleLocation);
      console.log(googleLocation);
      if (googleLocation?.note !== undefined) {
        setNote(googleLocation?.note);
      }
    }
  }, [googleLocation]);

  const onChangeText = async () => {
    if (search.term.trim() === '') return setPredictions([]);
    if (!search.fetchPredictions) return;
    const apiUrl = `${AUTO_COMPLETE_API_BASE_URL}&input=${search.term}&radius=500&language=th&region=th`;
    try {
      const result = await axios.request({
        method: 'post',
        url: apiUrl,
      });
      if (result) {
        const {
          data: { predictions },
        } = result;
        setPredictions(predictions);
        setShowPredictions(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onPredictionTapped = async (placeId, description) => {
    const apiUrl = `${DETAIL_API_BASE_URL}&place_id=${placeId}&language=th&region=th`;
    try {
      const result = await axios.request({
        method: 'post',
        url: apiUrl,
      });

      if (result) {
        const {
          data: {
            result: {
              geometry: { location },
            },
          },
        } = result;
        const { lat, lng } = location;
        let address = '';
        result.data.result.address_components.map(addr => {
          address += `${addr.long_name} `;
        });
        setShowPredictions(false);
        setSearch({ term: description });
        setLocation({
          latitude: lat,
          longitude: lng,
          address,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {
    const _location = { ...location, note };
    navigation.navigate('MainStack', {
      screen: 'PaymentOrder',
      params: {
        locationAddress: _location,
        bookingData: bookingData,
        bookingCategory: bookingCategory,
      },
    });
  };

  useDebounce(onChangeText, 0, [search.term]);

  return (
    <SafeAreaView style={{ flexGrow: 1 }} forceInset={{ top: 'always' }}>
      <Header
        text="Saved Places"
        onPressLeft={() => navigation.goBack()}
        renderRight={() => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('MainStack', {
                screen: 'GooglePlace',
                params: {
                  bookingData: bookingData,
                  bookingCategory: bookingCategory,
                },
              })
            }
          >
            <Icon size={20} name="map" color="gray" />
          </TouchableOpacity>
        )}
      />
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <SearchBarWithAutocomplete
            value={search.term}
            onChangeText={text => {
              setSearch({ term: text, fetchPredictions: true });
            }}
            showPredictions={showPredictions}
            predictions={predictions}
            onPredictionTapped={onPredictionTapped}
          />
          <View style={{ marginHorizontal: 10 }}>
            <TextInput
              style={{
                fontFamily: theme.fontFamilyDefault,
                fontSize: 16,
                paddingLeft: 15,
                paddingTop: 15,
                paddingRight: 15,
                paddingBottom: 15,
                width: '100%',
                borderRadius: 10,
                height: 150,
                textAlignVertical: 'top',
                borderWidth: 1,
                borderColor: theme.colors.grey4,
              }}
              numberOfLines={10}
              multiline={true}
              onChangeText={setNote}
              autoCorrect={false}
              placeholder={`รายละเอียดเพิ่มเติม`}
              placeholderTextColor="#7c7b7b"
              value={note}
              onSubmitEditing={() => console.log('test')}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View
        style={{
          padding: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderTopColor: '#f5f5f5',
          borderTopWidth: 3,
          backgroundColor: theme.colors.white,
        }}
      >
        <Button
          type="solid"
          title={i18next.t('CONFIRM_BUTTON')}
          buttonStyle={{
            backgroundColor: theme.colors.primary,
            borderColor: '#fff',
            borderWidth: 1,
          }}
          titleStyle={{
            fontSize: theme.fontSizeDefault,
            fontFamily: theme.fontFamilyBold,
            color: theme.colors.white,
          }}
          disabled={_.isEmpty(location)}
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

export default SavePlace;
