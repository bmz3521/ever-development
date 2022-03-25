import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import config from '@_config';
import Markdown from 'react-native-markdown-display';
import { Header, SafeAreaView } from '@components';
import styles from './styles';
import { useTheme } from 'react-native-elements';

const ContentFeedDetail = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { content } = route.params;

  const finalDescription = content?.description?.replace(
    new RegExp('/uploads/', 'g'),
    `${config.strapiUrl}/uploads/`,
  );

  return (
    <SafeAreaView style={{ flexGrow: 1 }} forceInset={{ top: 'always' }}>
      <Header onPressLeft={() => navigation.navigate('ContentFeed')} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles(theme).container}
      >
        <Text style={styles(theme).markdown.heading2}>{content.title}</Text>
        {finalDescription && (
          <Markdown style={styles(theme).markdown}>{finalDescription}</Markdown>
        )}
        <View style={styles(theme).bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContentFeedDetail;
