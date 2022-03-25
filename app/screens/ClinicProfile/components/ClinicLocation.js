import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import useStyles from '../styles';
import { useTheme } from 'react-native-elements';
import { Text } from '@components';

const ClinicLocation = ({ clinic }) => {
  const [textShown, setTextShown] = useState(false);
  const [locationMore, setLocationMore] = useState(false);
  const hasCoordinate = !!clinic.latitude && !!clinic.longitude;

  const baseStyles = useStyles();

  const toggleShowLocationMore = () => {
    setLocationMore(!locationMore);
    setTextShown(!textShown);
  };

  const { theme } = useTheme();

  return (
    <View
      style={[
        baseStyles.blockView,
        { marginHorizontal: 20, borderBottomColor: '#ffffff' },
      ]}
    >
      <View style={{ marginBottom: 10 }}>
        <Text type="buttonLarge">Location</Text>
      </View>
      <Text type="body3" style={baseStyles.textHeight}>
        {clinic.name} is located in {clinic.city}, {clinic.country}.
      </Text>

      <View style={{ marginTop: 10 }}>
        <Text
          type="body3"
          style={{ lineHeight: 25, color: theme.colors.grey3 }}
        >
          You can ask direction details from the clinics in chat after quotation
          submission.
        </Text>
      </View>

      {locationMore && (
        <View style={{ marginTop: 10 }}>
          <Text
            type="body3"
            style={{
              lineHeight: 25,
              marginBottom: 10,
              fontFamily: theme.fontFamilyDefault,
            }}
          >
            {clinic.locationDescription}
          </Text>
        </View>
      )}

      <TouchableOpacity
        onPress={() => toggleShowLocationMore()}
        style={{ alignItems: 'center' }}
      >
        <Text type="body3" style={baseStyles.locationShowBtn}>
          {textShown ? 'Show less' : 'Show more'}
        </Text>
      </TouchableOpacity>

      {hasCoordinate && (
        <View>
          <View style={baseStyles.mapWrapper}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={baseStyles.map}
              region={{
                latitude: parseFloat(clinic.latitude),
                longitude: parseFloat(clinic.longitude),
                latitudeDelta: 0.002305,
                longitudeDelta: 0.0010525,
              }}
              onRegionChange={() => {}}
            >
              <Marker
                coordinate={{
                  latitude: parseFloat(clinic.latitude),
                  longitude: parseFloat(clinic.longitude),
                }}
              />
            </MapView>
          </View>
        </View>
      )}
      <View style={baseStyles.bottomText}>
        <Text type="body3" style={{ color: theme.colors.grey3 }}>
          Exact location provided after booking
        </Text>
      </View>
    </View>
  );
};

export default ClinicLocation;
