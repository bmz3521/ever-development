import { View, FlatList } from 'react-native';
import React from 'react';
import useHooks from './hooks';
import { SafeAreaView, Text, Header, StarRating } from '@components';
import { BaseStyle } from 'app/theme-config';
import { useTheme } from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';
import useStyles from './styles';

const ClinicReview = ({ navigation, route }) => {
  const { review } = useHooks({ navigation, route });
  const { theme } = useTheme();
  const baseStyles = useStyles();

  const renderItem = ({ item }) => {
    return (
      <View style={baseStyles.reviewCard}>
        <View style={baseStyles.centerRow}>
          <View style={baseStyles.avatar}>
            <UserAvatar size={50} name={item.nickName} />
          </View>
          <View style={baseStyles.reviewTitle}>
            <View style={baseStyles.row}>
              <Text type="body4">{item.nickName} · </Text>
              <Text type="body3">{item.procedureDone}</Text>
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
          <Text type="body3">{item.reviewComment}</Text>
        </View>
      </View>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <View style={baseStyles.centerPageItem}>
        <Text type="body2">There aren't any reviews for this clinic yet</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header text="Reviews" onPressLeft={() => navigation.goBack()} />
      <FlatList
        data={review}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </SafeAreaView>
  );
};

export default ClinicReview;
