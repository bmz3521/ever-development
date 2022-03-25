import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-elements';
import { Text } from '@components';
import i18next from 'i18next';
import styles from '../styles';

const FilterCategoriesBar = ({ categories, handleCheck, contents }) => {
  const { theme } = useTheme();

  const hasContentCategoriesId = contents.map(
    item => item.content_feed_sub_category.content_feed_category,
  );

  const filterCategory = categories.filter(item =>
    hasContentCategoriesId.includes(item.categoryId),
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filterCategoriesBar}
    >
      {filterCategory.map(item => (
        <TouchableOpacity
          onPress={() => handleCheck(item)}
          key={item.categoryName}
        >
          <View
            style={[
              styles.categoryButton,
              {
                backgroundColor: theme.colors.white,
                borderBottomWidth: item.isCheck ? 3 : 0,
                borderColor: theme.colors.primary,
              },
            ]}
          >
            <Text
              type={item.isCheck ? 'buttonMedium' : 'body2'}
              style={{
                color: item.isCheck ? theme.colors.primary : theme.colors.grey3,
              }}
            >
              {i18next.language == 'th'
                ? item.categoryName
                : item.categoryNameEn}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default FilterCategoriesBar;
