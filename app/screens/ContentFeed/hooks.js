import React, { useState, useEffect, useCallback } from 'react';

import {
  getContentFeedCategoriesData,
  getContentFeedData,
} from '@services/contentFeedService';

const useHooks = () => {
  const [contents, setContents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      fetchContent();
    } catch (error) {
      console.log('refreshing error :>>', error);
      setRefreshing(false);
    } finally {
      setTimeout(() => setRefreshing(false));
    }
  }, [refreshing]);

  const fetchContent = useCallback(async () => {
    try {
      const content = await getContentFeedData();
      setContents(content);
      await fetchCategories();
      setIsLoading(false);
    } catch (error) {
      console.log('error while getting content', { error });
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const category = await getContentFeedCategoriesData();
      setCategories(category);
    } catch (error) {
      console.log('error while getting categories', { error });
    }
  }, []);

  const handleCheck = item => {
    const newCategories = categories.map(category => {
      if (category.categoryName === item.categoryName) {
        category.isCheck = !item.isCheck;
      } else {
        category.isCheck = false;
      }
      return category;
    });

    setCategories(newCategories);

    const checkedCategory = categories.filter(
      category => category.isCheck === true,
    );

    if (checkedCategory.length > 0) {
      const newSubCategories = checkedCategory[0].subCategories.sort(
        (a, b) => a.Sub_Category_order - b.Sub_Category_order,
      );

      const hasContentSubCategoriesId = contents.map(
        item => item.content_feed_sub_category.id,
      );

      const filterSubCategory = newSubCategories.filter(item =>
        hasContentSubCategoriesId.includes(item.id),
      );

      setSubCategories(filterSubCategory);
    } else if (checkedCategory.length === 0) {
      setSubCategories([]);
    }
  };

  const handleCheckSubCategories = item => {
    const newSubCategories = subCategories.map(subCategory => {
      if (subCategory.name === item.name) {
        subCategory.isCheck = !item.isCheck;
      }

      return subCategory;
    });
    setSubCategories(newSubCategories);
  };

  const isCheckedCategory = categories
    .map(category => {
      if (category.isCheck === true) {
        return category.categoryId;
      }
    })
    .filter(item => item !== undefined);

  const isCheckedSubCategory = subCategories
    .map(subCategory => {
      if (subCategory.isCheck === true) {
        return subCategory.name;
      }
    })
    .filter(item => item !== undefined);

  const filterContent = contents.filter(content => {
    if (isCheckedCategory.length === 0) {
      return contents;
    }

    if (isCheckedCategory.lenth !== 0 && isCheckedSubCategory.length === 0) {
      return isCheckedCategory.includes(
        content.content_feed_sub_category.content_feed_category,
      );
    }

    if (isCheckedCategory.lenth !== 0 && isCheckedSubCategory.length !== 0) {
      return isCheckedSubCategory.includes(
        content.content_feed_sub_category.name,
      );
    }
  });

  useEffect(() => {
    fetchContent();
  }, []);

  return {
    categories,
    subCategories,
    isLoading,
    filterContent,
    handleCheck,
    handleCheckSubCategories,
    contents,
    refreshing,
    onRefresh,
  };
};

export { useHooks };
