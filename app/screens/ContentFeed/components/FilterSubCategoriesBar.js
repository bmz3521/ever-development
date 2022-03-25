import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-elements';
import { Text } from '@components';
import i18next from 'i18next';
import styles from '../styles';

const FilterSubCategoriesBar = ({
  subCategories,
  handleCheckSubCategories,
}) => {
  const { theme } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.subCategoriesBar}
    >
      {subCategories.map(item => (
        <TouchableOpacity
          style={styles.subCategoriesContainer}
          onPress={() => handleCheckSubCategories(item)}
          key={item.name}
        >
          <View
            style={[
              styles.subCategoriesButton,
              {
                backgroundColor: item.isCheck
                  ? theme.colors.secondary
                  : theme.colors.grey4,
                borderColor: item.isCheck
                  ? theme.colors.secondary
                  : theme.colors.grey4,
              },
            ]}
          >
            <Text
              type="buttonSmall"
              style={{
                color: item.isCheck ? theme.colors.white : theme.colors.white,
              }}
            >
              {i18next.language === 'th' ? item.name : item.name_en}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default FilterSubCategoriesBar;
