import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text } from '@components';
import styles from '../styles';
import config from '@_config';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'react-native-elements';

const ContentList = ({ contents, navigation }) => {
  const { theme } = useTheme();
  return (
    <View style={styles.listContainer}>
      {contents.map(content => {
        return (
          <TouchableOpacity
            style={styles.cardContainer}
            key={content.title}
            onPress={() =>
              navigation.navigate('ContentFeedDetail', { content: content })
            }
            activeOpacity={0.7}
          >
            <Image
              source={{
                uri: `${config.strapiUrl}${content.cover_image_path?.url}`,
              }}
              style={styles.image}
            />
            <View style={styles.titleContainer}>
              <LinearGradient colors={[theme.colors.grey2, 'rgba(50,50,50,0)']}>
                <Text numberOfLines={2} type="h5" style={styles.title}>
                  {content.title}
                </Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ContentList;
