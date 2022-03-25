import { View, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-elements';
import { Text, StarRating } from '@components';
import UserAvatar from 'react-native-user-avatar';
import useStyles from '../styles';

const ReviewCard = ({ item, last, length, review, navigation }) => {
  const { theme } = useTheme();
  const baseStyles = useStyles();
  if (last) {
    return (
      <TouchableOpacity
        style={baseStyles.reviewCard}
        onPress={() =>
          navigation.navigate('ClinicReview', {
            review: review,
          })
        }
      >
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text
            type="h6"
            style={{
              lineHeight: 20,
              textDecorationLine: 'underline',
            }}
          >
            {`Show all ${length} reviews`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <View style={baseStyles.reviewCard}>
      <View style={baseStyles.rowCenter}>
        <View style={baseStyles.avatar}>
          <UserAvatar size={50} name={item.nickName} />
        </View>
        <View style={baseStyles.reviewTitle}>
          <View style={baseStyles.row}>
            <Text type="body4">{item.nickName}</Text>
          </View>
          <View style={baseStyles.row}>
            {item.verified === 'yes' && (
              <Text type="body5">Verified Patients · </Text>
            )}
            <Text type="body5">
              {item.monthOfReview} {item.yearOfReview}
            </Text>
          </View>
          <View style={baseStyles.starWrapper}>
            <StarRating
              disabled={true}
              starSize={14}
              maxStars={5}
              rating={parseFloat(item.starRating)}
              selectedStar={() => {}}
              fullStarColor={theme.colors.primary}
            />
          </View>
        </View>
      </View>
      <View style={baseStyles.comment}>
        <Text type="body3" numberOfLines={5}>
          {item.reviewComment}
        </Text>
      </View>
    </View>
  );
};

export default ReviewCard;
