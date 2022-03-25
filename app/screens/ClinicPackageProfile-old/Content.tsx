/* eslint-disable max-len */
import React from "react";
import { Dimensions, StyleSheet, Text, View, FlatList, Image } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import Animated, { Extrapolate, interpolate } from "react-native-reanimated";
import * as Card from "../../minimal-components/Cards";
import * as Lists from "../../minimal-components/List";

import { HEADER_IMAGE_HEIGHT } from "./HeaderImage";
import { MIN_HEADER_HEIGHT } from "./Header";
import { review } from "../../data/detailreview";

const { width, height } = Dimensions.get("window");
const items = [
  {
    title: "Price Tab",
    description:
      "Korean fried chicken glazed with Gochujang, garnished with sesame & spring onions, served with fries & Miss Miu Mayo",
    price: "26 CHF",
  },
  {
    title: "Other costs (not included in product price)",
    description:
      "Korean fried chicken starter with dirty cheese sauce and Artisan Hot Sauce - the naughty version new, favourite",
    price: "13.50 CHF",
  },
  {
    title: "Hospital benefits",
    description: "Portion, vegan",
    price: "5.00 CHF",
  },
  {
    title: "Benefits",
    description:
      "Homemade steamed dim sum with minced pork, shiitake mushrooms and smokey honey flavour, four pcs",
    price: "10.50 CHF",
  },
  {
    title: "Graphic Description",
    description:
      "Beef Bibimbap, sesame oil, rice, beans, spinach, carrots, spring onions, Chinese cabbage, shiitake mushrooms, roasted onions and egg",
    price: "26.50 CHF",
  },
];

const menu = [
  { name: "Description", component: 'diary', items },
  { name: "Benefits", component: 'clinicProfile',  items },
  { name: "Process", component: 'review',  items },
  { name: "Policy", component: '',  items },
];
export const defaultTabs = menu.map(({ name }) => ({ name, anchor: 0 }));
const styles = StyleSheet.create({
  section: {
    padding: 16,
  },
  placeholder: {
    height: HEADER_IMAGE_HEIGHT,
    marginBottom: MIN_HEADER_HEIGHT,
  },
  text: {
    fontFamily: "UberMoveRegular",
    fontSize: 14,
  },
  title1: {
    fontFamily: "UberMoveMedium",
    fontSize: 24,
  },
  title2: {
    fontFamily: "UberMoveMedium",
    fontSize: 16,
  },
  divider: {
    height: 2,
    backgroundColor: "#e2e3e4",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  ratings: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  link: {
    color: "#247A00",
  },
  item: {
    borderBottomColor: "#e2e3e4",
    borderBottomWidth: 1,
    marginTop: 16,
  },
  title: {
    fontFamily: "UberMoveMedium",
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
  },
  price: {
    fontFamily: "UberMoveMedium",
    marginBottom: 16,
  },
});

export interface TabModel {
  name: string;
  anchor: number;
}

interface ContentProps {
  y: Animated.Node<number>;
  onMeasurement: (index: number, tab: TabModel) => void;
}

export default ({ y, info, onMeasurement }: ContentProps) => {

  const renderDiary = ({ item, index }) => {
    if (index === 0) {
      return (
        <View
          style={{
            width: width - 40,
            marginLeft: 20,
            marginTop: 5,
            marginBottom: 5,
            marginRight: 5,
          }}
        >
          <Card.Diary
            imagexsmall={item.avatar}
            title={item.username}
            secondary={item.date}
            content={item.comments}
          />
        </View>
      );
    } else {
      return (
        <View style={{ width: width - 40, margin: 5 }}>
          <Card.Diary
            imagexsmall={item.avatar}
            title={item.username}
            secondary={item.date}
            content={item.comments}
          />
        </View>
      );
    }
  };

  const renderItem = ({ item, index }) => {
    if (index === 0) {
      return (
        <View
          style={{
            width: width - 100,
            marginLeft: 20,
            marginTop: 5,
            marginBottom: 5,
            marginRight: 5,
          }}
        >
          <Card.Review
            imagexsmall={item.avatar}
            title={item.username}
            secondary={item.date}
            content={item.comments}
          />
        </View>
      );
    } else {
      return (
        <View style={{ width: width - 100, margin: 5 }}>
          <Card.Review
            imagexsmall={item.avatar}
            title={item.username}
            secondary={item.date}
            content={item.comments}
          />
        </View>
      );
    }
  };

  const opacity = interpolate(y, {
    inputRange: [
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT - 100,
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT,
    ],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <>
      <View style={styles.placeholder} />
      <Animated.View style={[styles.section, { opacity }]}>
        <Text style={styles.text}>$$ • Asiatisch • Koreanisch • Japanisch</Text>
        <View style={styles.info}>
          <Text style={styles.text}>Opens at 11:30 AM</Text>
          <View style={styles.ratings}>
            <Icon name="star" color="#f4c945" size={24} style={styles.icon} />
            <Text style={styles.text}>(186)</Text>
          </View>
        </View>
      </Animated.View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <Text style={styles.title2}>Clinic info</Text>
        <View style={styles.info}>
          <Text style={styles.text}>Europaallee 48, Zürich, Zürich 8004</Text>
          <Text style={styles.link}>More info</Text>
        </View>
      </View>
      <View style={styles.divider} />
      {menu.map(({ component, name, items: menuItems }, index) => (
        <View
          style={styles.section}
          key={index}
          onLayout={({
            nativeEvent: {
              layout: { y: anchor },
            },
          }) => onMeasurement(index, { name, anchor: anchor - 142 })}
        >

          {component === 'diary' && <View style={{marginHorizontal: -20}}>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
          <View style={{alignSelf: 'center', backgroundColor: 'green', marginLeft: 20, width: 3, height: 17}}/>
          <Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 20}}>Diary</Text>
          </View>
            <FlatList
            data={review.slice(0, 4)}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            decelerationRate={0}
            snapToInterval={width - 30}
            snapToAlignment="center"
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={renderDiary}
            // contentContainerStyle={{marginLeft: -20}}
          /></View> }
          {component === 'clinicProfile' && <View style={{marginHorizontal: -20}}>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
          <View style={{alignSelf: 'center', backgroundColor: 'green', marginLeft: 20, width: 3, height: 17}}/>
          <Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 20}}>Center profile</Text>
          </View>
          <View style={{marginLeft: 20, width: 300}}>
          <Lists.UserList
            title={'Test kdasopkdo ap'}
            imagexsmall={'imagexsmall'}
            secondary={'Test faksofpako pfkaspf koaspk foap'}
          />
          </View>
          </View> }
          {component === 'review' && <View style={{marginHorizontal: -20}}><FlatList
            data={review.slice(0, 4)}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            decelerationRate={0}
            snapToInterval={width - 90}
            snapToAlignment="center"
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            // contentContainerStyle={{marginLeft: -20}}
          /></View> }
          <Text style={styles.title1}>{info.name}</Text>
          {/* {menuItems.map(({ title, description, price }, j) => (
            <View style={styles.item} key={j}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {description}
              </Text>
              <Text style={styles.price}>{price}</Text>
            </View>
          ))} */}
        </View>
      ))}
       <FlatList
      showsHorizontalScrollIndicator={false} 
      data={info && info.data && info.data.ClinicPhotos}
      renderItem={ ({ item, index }) => (
        <Image source={{uri: item.photo}} /* Use item to set the image source */
          key={index} /* Important to set a key for list items,
                        but it's wrong to use indexes as keys, see below */
          style={{
            height: 1000,
            flex: 1,
            borderWidth:2,
            resizeMode:'cover',
          }}
        />
      )}
      />

      <View style={{ height }} />
    </>
  );
};
