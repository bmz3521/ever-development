import React from 'react';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { Text } from '@components';
import GraphArea from './GraphArea';
import HeartArea from './HeartArea';
import EmptyGraphArea from './EmptyGraphArea';

const { height, width } = Dimensions.get('screen');

const WeeklySync = ({
  weeklySteps,
  notAuthorized,
  weeklyHeartRates,
  translateX,
  threshold,
  navigation,
}) => {
  return (
    <View style={[styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {weeklySteps.length <= 0 ? (
          <EmptyGraphArea
            notAuthorized={notAuthorized}
            navigation={navigation}
            translateX={translateX}
          />
        ) : threshold != 0 ? (
          <>
            <GraphArea
              weeklySteps={weeklySteps}
              translateX={translateX}
              threshold={threshold}
              navigation={navigation}
            />
            <HeartArea
              weeklyHeartRates={weeklyHeartRates}
              translateX={translateX}
              threshold={threshold}
              navigation={navigation}
            />
          </>
        ) : (
          <View style={styles.blankContainer}>
            <Text h5>Data is not fully loaded.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default WeeklySync;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  blankContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
