import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList, Image } from 'react-native';
import {
  // Image,
  Text,
  Icon,
  StarRating,
  Tag,
} from '@components';
import { BaseColor } from '@config';
import PropTypes from 'prop-types';
import styles from './styles';
export default class ClinicItem extends Component {
  constructor(props) {
    super(props);
  }
  /**
   * Display clinic item as block
   */
  renderBlock() {
    const {
      style,
      image,
      name,
      location,
      price,
      available,
      rate,
      rateStatus,
      onPress,
      onPressTag,
      services,
      city,
      country,
    } = this.props;
    return (
      <View style={style}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image
            style={styles.blockImage}
            source={{ uri: `${this.props.image}` }}
          />
        </TouchableOpacity>
        <View style={{ paddingHorizontal: 20 }}>
          <Text title2 semibold style={{ marginTop: 5 }} numberOfLines={1}>
            {name}
          </Text>
          <View style={styles.blockContentAddress}>
            <Icon
              name="map-marker-alt"
              color={BaseColor.lightPrimaryColor}
              size={10}
            />
            <Text
              caption1
              grayColor
              style={{
                marginLeft: 3,
              }}
              numberOfLines={1}
            >
              {city} - {country}
            </Text>
          </View>
          <View style={styles.blockContentDetail}>
            <View>
              <Text title3 primaryColor semibold>
                {price}
              </Text>
              <Text
                caption1
                accentColor
                style={{
                  marginTop: 3,
                }}
                numberOfLines={1}
              >
                {available}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <Tag onPress={onPressTag} rate>
                {rate}
              </Tag>
              <View
                style={{
                  marginLeft: 10,
                }}
              >
                <Text caption1 grayColor semibold style={{ paddingBottom: 5 }}>
                  {rateStatus}
                </Text>
                <StarRating
                  disabled={true}
                  starSize={10}
                  maxStars={5}
                  rating={rate}
                  selectedStar={rating => {}}
                  halfStarColor={BaseColor.yellowColor}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.contentService}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={services}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => (
              <View style={styles.serviceItemBlock} key={'block' + index}>
                <Icon
                  name={item.icon}
                  size={16}
                  color={BaseColor.accentColor}
                />
                <Text
                  overline
                  grayColor
                  style={{ marginTop: 4 }}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
              </View>
            )}
          />
          <TouchableOpacity
            style={{
              alignItems: 'flex-end',
              justifyContent: 'center',
              width: 16,
            }}
          >
            <Icon
              name="angle-right"
              size={16}
              color={BaseColor.textSecondaryColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  /**
   * Display clinic item as list
   */
  renderList() {
    const {
      style,
      image,
      name,
      city,
      country,
      price,
      available,
      rate,
      rateCount,
      onPress,
    } = this.props;

    return (
      <View style={{ marginBottom: 20 }}>
        <Text
          headline
          semibold
          numberOfLines={1}
          style={{ paddingHorizontal: 15 }}
        >
          {name}
        </Text>
        <View style={[styles.listContent, style]}>
          <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
            <Image
              source={{ uri: `${this.props.image}` }}
              style={styles.listImage}
            />
          </TouchableOpacity>
          <View style={styles.listContentRight}>
            <View style={styles.listContentRow}>
              <StarRating
                disabled={true}
                starSize={20}
                maxStars={5}
                rating={rate}
                selectedStar={rating => {}}
                fullStarColor={BaseColor.yellowColor}
              />
              <Text
                caption1
                grayColor
                semibold
                style={{
                  marginLeft: 10,
                  marginRight: 3,
                }}
              >
                {rate} + Rating
              </Text>
              <Text caption1 primaryColor semibold>
                {rateCount}
              </Text>
            </View>
            <View style={styles.listContentRow}>
              <Icon
                name="map-marker-alt"
                color={BaseColor.lightPrimaryColor}
                size={10}
              />
              <Text
                caption1
                grayColor
                style={{
                  marginLeft: 3,
                }}
                numberOfLines={1}
              >
                {city}, {country}
              </Text>
            </View>
            <Text
              title3
              primaryColor
              semibold
              style={{ marginTop: 5, marginBottom: 5 }}
            >
              $324
            </Text>
            <Text caption1 semibold>
              AVG/NIGHT
            </Text>
            <Text footnote accentColor style={{ marginTop: 3 }}>
              {available}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  /**
   * Display clinic item as grid
   */
  renderGrid() {
    const {
      style,
      image,
      name,
      location,
      price,
      rate,
      numReviews,
      onPress,
      city,
      country,
    } = this.props;
    return (
      <View style={[styles.girdContent, style]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image
            source={{ uri: `${this.props.image}` }}
            style={styles.girdImage}
          />
        </TouchableOpacity>
        <View style={styles.girdContentLocation}>
          <Icon
            name="map-marker-alt"
            color={BaseColor.primaryColor}
            size={10}
          />
          <Text
            caption2
            grayColor
            style={{
              marginLeft: 3,
            }}
            numberOfLines={1}
          >
            {city} - {country}
          </Text>
        </View>
        <Text
          body2
          semibold
          style={{
            marginTop: 5,
          }}
        >
          {name}
        </Text>
        <View style={styles.girdContentRate}>
          <StarRating
            disabled={true}
            starSize={10}
            maxStars={5}
            rating={rate}
            selectedStar={rating => {}}
            fullStarColor={BaseColor.yellowColor}
          />
          <Text caption2 grayColor>
            {numReviews} reviews
          </Text>
        </View>
        <Text
          title3
          primaryColor
          semibold
          style={{
            marginTop: 5,
          }}
        >
          {price}
        </Text>
      </View>
    );
  }

  render() {
    let { block, grid } = this.props;
    if (grid) return this.renderGrid();
    else if (block) return this.renderBlock();
    else return this.renderList();
  }
}

ClinicItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  list: PropTypes.bool,
  block: PropTypes.bool,
  grid: PropTypes.bool,
  name: PropTypes.string,
  location: PropTypes.string,
  price: PropTypes.string,
  available: PropTypes.string,
  rate: PropTypes.number,
  rateCount: PropTypes.string,
  rateStatus: PropTypes.string,
  numReviews: PropTypes.number,
  services: PropTypes.array,
  onPress: PropTypes.func,
  onPressTag: PropTypes.func,
  city: PropTypes.string,
  country: PropTypes.string,
};

ClinicItem.defaultProps = {
  style: {},
  image: '',
  city: '',
  country: '',
  list: true,
  block: false,
  grid: false,
  name: '',
  location: '',
  price: '',
  available: '',
  rate: 0,
  rateCount: '',
  rateStatus: '',
  numReviews: 0,
  services: [],
  onPress: () => {},
  onPressTag: () => {},
};
