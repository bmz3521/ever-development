import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Divider, useTheme } from 'react-native-elements';
import i18next from 'i18next';

import styles from './styles';
import BookingCard from '@components/BookingCard';

const TeleMed = ({
  navigation,
  refreshing,
  activeBooking,
  completedBooking,
  actions,
  loading,
}) => {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={actions.onRefresh} />
      }
    >
      <>
        {activeBooking?.length === 0 && completedBooking?.length === 0 ? (
          <View style={styles.container}>
            <View style={styles.centerPageItem}>
              <Text
                style={{
                  fontFamily: theme.fontFamilyDefault,
                  fontSize: theme.fontSizeDefault,
                }}
              >
                {loading ? '' : i18next.t('MYBOOKINGUI_NO_DATA')}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.container}>
            {activeBooking?.length > 0 && (
              <View>
                <View style={styles.listHeaderContainer}>
                  <Text
                    style={[
                      styles.listHeaderText,
                      {
                        fontSize: theme.fontSizeDefault,
                        fontFamily: theme.fontFamilyDefault,
                      },
                    ]}
                  >
                    {i18next.t('MYBOOKINGUI_ACTIVE_BOOKINGS')}
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('BookingStack', {
                        screen: 'BookingList',
                        params: {
                          title: i18next.t('MYBOOKINGUI_ACTIVE_BOOKINGS'),
                        },
                      })
                    }
                  >
                    <Text
                      style={[
                        styles.showAllButton,
                        { fontFamily: theme.fontFamilyDefault },
                      ]}
                    >
                      {i18next.t('MYBOOKINGUI_SHOW_ALL')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Divider style={styles.divider} />
                {activeBooking?.map((item, index) => {
                  return (
                    <BookingCard
                      item={item}
                      key={index}
                      navigation={navigation}
                    />
                  );
                })}
              </View>
            )}

            {completedBooking?.length > 0 && (
              <View>
                <View style={styles.listHeaderContainer}>
                  <Text
                    style={[
                      styles.listHeaderText,
                      {
                        fontSize: theme.fontSizeDefault,
                        fontFamily: theme.fontFamilyDefault,
                      },
                    ]}
                  >
                    {i18next.t('MYBOOKINGUI_COMPLETED_BOOKINGS')}
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('BookingStack', {
                        screen: 'BookingList',
                        params: {
                          title: i18next.t('MYBOOKINGUI_COMPLETED_BOOKINGS'),
                        },
                      })
                    }
                  >
                    <Text
                      style={[
                        styles.showAllButton,
                        { fontFamily: theme.fontFamilyDefault },
                      ]}
                    >
                      {i18next.t('MYBOOKINGUI_SHOW_ALL')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Divider style={styles.divider} />
                {completedBooking?.map((item, index) => {
                  return (
                    <BookingCard
                      item={item}
                      key={index}
                      navigation={navigation}
                    />
                  );
                })}
              </View>
            )}
          </View>
        )}
      </>
    </ScrollView>
  );
};

export default TeleMed;
