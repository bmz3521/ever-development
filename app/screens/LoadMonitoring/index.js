import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { MonitoringActions } from '@actions';

function LoadMonitoring({ navigation }) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  // Load the first batch of data and store it in reducers
  const getData = async () => {
    try {
      await Promise.all([
        dispatch(
          MonitoringActions.getSummary({
            userInfo: user.data.id,
          }),
        ),
        dispatch(
          MonitoringActions.getMonitoring({
            userId: user.data.userId,
            typeId: 3,
            page: 1,
          }),
        ),
        dispatch(
          MonitoringActions.getMonitoring({
            userId: user.data.userId,
            typeId: 4,
            page: 1,
          }),
        ),
        dispatch(
          MonitoringActions.getMonitoring({
            userId: user.data.userId,
            typeId: 5,
            page: 1,
          }),
        ),
        dispatch(
          MonitoringActions.getMonitoring({
            userId: user.data.userId,
            typeId: 6,
            page: 1,
          }),
        ),
        dispatch(
          MonitoringActions.getMonitoring({
            userId: user.data.userId,
            typeId: 7,
            page: 1,
          }),
        ),
        dispatch(
          MonitoringActions.getMonitoring({
            userId: user.data.userId,
            typeId: 8,
            page: 1,
          }),
        ),
      ]);
    } catch (error) {
      console.log(error, 'Failed to load data.');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="00bae5" />
    </View>
  );
}

export default LoadMonitoring;
