import React from 'react';
import axios from 'axios';
import {
  Platform,
  PermissionsAndroid,
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
} from 'react-native';
import { Header, Text, SafeAreaView } from '@components';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { styles } from './styles';
import { GEO_CODE_API_BASE_URL } from './constants';
import { useTheme, Icon } from 'react-native-elements';
import i18next from 'i18next';
import { updateBookingAddressById } from '@services/bookingService';

const GooglePlace = props => {
  const { navigation, route } = props;
  const { bookingCategory, bookingData } = route.params;
  const [position, setPosition] = React.useState({});
  const [marker, setMarker] = React.useState({});
  const [locationAddress, setLocationAddress] = React.useState({});
  const [isLocation, setIsLocation] = React.useState(false);
  const { theme } = useTheme();

  React.useEffect(() => {
    requestPermissions();
  }, []);

  React.useEffect(() => {
    if (isLocation) {
      currentLocation();
    }
  }, [isLocation]);

  const handleCheckLocation = async location => {
    const { latitude, longitude } = location;
    setMarker(location);
    const apiUrl = `${GEO_CODE_API_BASE_URL}&latlng=${latitude},${longitude}&language=th&region=th`;
    const result = await axios.request({
      method: 'post',
      url: apiUrl,
    });
    let mockAddress = {
      latitude,
      longitude,
      address: '',
    };
    result.data.results[0].address_components.map(addr => {
      mockAddress.address += `${addr.long_name} `;
    });
    setLocationAddress(mockAddress);
  };

  const currentLocation = async () => {
    Geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        setPosition({
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
        handleCheckLocation({ latitude, longitude });
      },
      error => {
        console.log('ERROR', error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      if (auth === 'granted') {
        setIsLocation(true);
      }
    }

    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (PermissionsAndroid.RESULTS.GRANTED === 'granted') {
        setIsLocation(true);
      }
    }
  };

  const confirmAddress = () => {
    navigation.navigate('SavePlace', {
      bookingCategory,
      bookingData,
      googleLocation: locationAddress,
    });
  };

  return (
    <SafeAreaView style={{ flexGrow: 1 }} forceInset={{ top: 'always' }}>
      <View
        style={{
          marginLeft: 10,
          flexDirection: 'row',
          position: 'absolute',
          top: 55,
          zIndex: 1,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.grey1,
            paddingHorizontal: 5,
            paddingVertical: 5,
            borderRadius: 100,
          }}
          onPress={() =>
            navigation.navigate('SavePlace', { bookingId: bookingId })
          }
        >
          <Icon
            name="chevron-down"
            type="font-awesome-5"
            size={theme.fontSizeLarge}
            color={theme.colors.white}
          />
        </TouchableOpacity>
      </View>
      {!!position.latitude && !!position.longitude && isLocation && (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={position}
            provider={PROVIDER_GOOGLE}
          >
            <Marker
              coordinate={marker}
              draggable
              onDragEnd={e => handleCheckLocation(e.nativeEvent.coordinate)}
            />
          </MapView>
          <View style={styles.buttonConfirm}>
            <TouchableOpacity onPress={confirmAddress}>
              <Text style={styles.textConfirm}>
                {i18next.t('CONFIRM_BUTTON')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default GooglePlace;
