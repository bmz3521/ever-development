import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useTheme } from 'react-native-elements';
import { Header, Loading } from '@components';
import styles from './styles';
import { useHooks } from './hooks';
import BookingCard from '@components/BookingCard';
import i18next from 'i18next';

const BookingList = ({ navigation, route }) => {
  const { title } = route.params;
  const { theme } = useTheme();
  const { bookingData, bottomLoading, loading, actions } = useHooks({
    title,
    navigation,
  });

  const ListEmptyComponent = () => {
    return (
      <View style={styles.centerPageItem}>
        <Text
          style={{
            fontFamily: theme.fontFamilyDefault,
            fontSize: theme.fontSizeDefault,
          }}
        >
          {!loading ? i18next.t('MYBOOKINGUI_NO_DATA') : ''}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header text={title} onPressLeft={() => navigation.goBack()} />
      <Loading isVisible={loading} />
      <View style={styles.listContainer}>
        <FlatList
          data={bookingData}
          renderItem={({ item }) => (
            <BookingCard item={item} navigation={navigation} />
          )}
          keyExtractor={bookingData.bookingId}
          ListEmptyComponent={ListEmptyComponent}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          onEndReached={actions.onEndReached}
          onEndReachedThreshold={0.1}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={1000}
          ListFooterComponent={() => {
            if (bottomLoading)
              return (
                <View>
                  <ActivityIndicator
                    size="large"
                    style={{ marginTop: 10 }}
                    color={theme.colors.grey4}
                  />
                </View>
              );
            return null;
          }}
        />
      </View>
    </View>
  );
};

export default BookingList;
