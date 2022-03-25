import React from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Header, Loading2, SafeAreaView } from '@components';
import FilterSubCategoriesBar from './components/FilterSubCategoriesBar';
import FilterCategoriesBar from './components/FilterCategoriesBar';
import ContentList from './components/ContentList';
import { useHooks } from './hooks';
import i18next from 'i18next';

const ContentFeed = ({ navigation }) => {
  const {
    categories,
    subCategories,
    isLoading,
    filterContent,
    handleCheck,
    handleCheckSubCategories,
    contents,
    refreshing,
    onRefresh,
  } = useHooks();

  return (
    <SafeAreaView style={{ flexGrow: 1 }} forceInset={{ top: 'always' }}>
      <Header
        text={i18next.t('CONTENTFEED_HEADER')}
        onPressLeft={() => navigation.navigate('Home')}
      />
      {isLoading ? (
        <Loading2 />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View>
            <FilterCategoriesBar
              categories={categories}
              handleCheck={handleCheck}
              contents={contents}
            />
            {subCategories.length > 0 && (
              <FilterSubCategoriesBar
                subCategories={subCategories}
                handleCheckSubCategories={handleCheckSubCategories}
                contents={contents}
              />
            )}
            <ContentList contents={filterContent} navigation={navigation} />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ContentFeed;
