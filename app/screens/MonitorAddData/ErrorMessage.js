import React from 'react';
import { StyleSheet, Text } from 'react-native';

function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;

  return <Text style={styles.error}>{error}</Text>;
}

const styles = StyleSheet.create({
  error: {
    fontFamily: 'Prompt-Regular',
    color: 'red',
    fontSize: 14,
    paddingRight: 60,
  },
});

export default ErrorMessage;
