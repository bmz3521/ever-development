import axios from 'axios';
import config from '@_config';
import moment from 'moment';

const strapiUrl = config.strapiUrl;

export async function getContentFeedData() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`${strapiUrl}/content-feeds`);
      const responseData = await response.data;

      const sortedDataByCreateDate = await responseData.sort(
        (a, b) =>
          moment(b.created_at).format('YYYYMMDD') -
          moment(a.created_at).format('YYYYMMDD'),
      );

      const validData = await sortedDataByCreateDate.filter(
        content => content.content_feed_sub_category !== null,
      );

      resolve(validData);
    } catch (e) {
      console.log('Error retrieving content feed data', e);
      reject({ err: e.response });
    }
  });
}

export async function getContentFeedCategoriesData() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`${strapiUrl}/content-feed-categories`);
      const responseData = await response.data;

      const categoriesData = await responseData.map(category => ({
        categoryName: category.name,
        categoryNameEn: category.name_en,
        subCategories: category.content_feed_sub_categories,
        isCheck: false,
        categoryId: category.id,
        category_order: category.category_order,
      }));

      const sortedCategories = await categoriesData.sort(
        (a, b) => a.category_order - b.category_order,
      );

      resolve(sortedCategories);
    } catch (e) {
      console.log('Error retrieving content feed categories data', e);
      reject({ err: e.response });
    }
  });
}

export async function getTwoLastestContent() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`${strapiUrl}/content-feeds`);
      const responseData = await response.data;

      const validContentData = responseData.filter(
        content => content.content_feed_sub_category !== null,
      );

      const lastTwoContents = validContentData
        .sort(
          (a, b) =>
            moment(b.created_at).format('YYYYMMDD') -
            moment(a.created_at).format('YYYYMMDD'),
        )
        .slice(0, 2);

      resolve(lastTwoContents);
    } catch (e) {
      console.log('Error retrieving content feed categories data', e);
      reject({ err: e.response });
    }
  });
}

// export default new Resource('', {
//   getContentFeedCategories: {
//     url: `content-feed-categories`,
//     method: 'get',
//   },
//   getContentFeedSubCategories: {
//     url: `content-feed-sub-categories`,
//     method: 'get',
//   },
//   getContentFeed: {
//     url: `content-feeds`,
//     method: 'get',
//   },
// });
