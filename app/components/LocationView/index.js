import React from 'react';
import { View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import useStyles from './styles';

const LocationView = ({ lat, lon }) => {
  const hasCoordinate = !!lat && !!lon;

  const baseStyles = useStyles();
  return (
    <>
      {hasCoordinate && (
        <View>
          <View style={baseStyles.mapWrapper}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={baseStyles.map}
              region={{
                latitude: parseFloat(lat),
                longitude: parseFloat(lon),
                latitudeDelta: 0.002305,
                longitudeDelta: 0.0010525,
              }}
              onRegionChange={() => {}}
            >
              <Marker
                coordinate={{
                  latitude: parseFloat(lat),
                  longitude: parseFloat(lon),
                }}
              />
            </MapView>
          </View>
        </View>
      )}
    </>
  );
};

export default LocationView;
