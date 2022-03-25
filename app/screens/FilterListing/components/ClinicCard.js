import React, { useRef } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import styles from '../styles';
import { useTheme, Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from '@components';
import { useSelector } from 'react-redux';

const ClinicCardComponent = props => {
  const { clinic, index, navigation, savelist, onPressModal } = props;
  const { theme } = useTheme();

  const hasInSaveList = savelist
    .map(item => item.clinics)
    .flat()
    .find(item => item.id == clinic.id);

  const ImageComponent = props => {
    return <Image {...props} />;
  };
  const ImageMemo = React.memo(ImageComponent);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ClinicProfile', { clinicId: clinic.id })
      }
    >
      <View key={index} style={styles(theme).clinicCardContainer}>
        <View style={styles(theme).clinicImageContainer}>
          <ImageMemo
            resizeMode="cover"
            source={{
              uri: `${clinic.featureImageM}`,
            }}
            style={{ width: '100%', height: '100%' }}
          />
          <TouchableOpacity
            style={{ position: 'absolute', top: 15, right: 20 }}
            onPress={onPressModal}
          >
            <View
              style={{
                backgroundColor: 'rgba(255,255,255, 0.8)',
                padding: 5,
                borderRadius: 50,
              }}
            >
              {hasInSaveList ? (
                <Ionicons name="heart" size={20} color="red" />
              ) : (
                <Ionicons name="heart-outline" size={20} />
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles(theme).clinicInfoContainer}>
          <View style={styles(theme).clinicDetailContainer}>
            <View style={styles(theme).clinicNameContainer}>
              <Text style={styles(theme).clinicName}>{clinic.name}</Text>
            </View>
            <View style={styles(theme).iconRow}>
              <Icon
                type="ionicon"
                name="location-outline"
                size={20}
                color={theme.colors.primary}
              />
              <Text style={styles(theme).detail}>
                {`${clinic.country}, ${clinic.city}`}
              </Text>
            </View>
          </View>
          <View style={styles(theme).ratingReviewContainer}>
            <View style={styles(theme).ratingContainer}>
              <Icon type="ionicon" name="star" size={20} color="#ffcd3c" />
              <Text style={styles(theme).ratingText}>{5.0}</Text>
            </View>
            <View style={styles(theme).reviewContainer}>
              <Text style={styles(theme).reviewText}>{`2,233 Reviews`}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ClinicCard = React.memo(ClinicCardComponent);

export default ClinicCard;
