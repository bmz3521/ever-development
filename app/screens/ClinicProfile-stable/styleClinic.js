import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { BaseColor } from '@config';
import * as Utils from '@utils';

export default StyleSheet.create({
  imgBanner: {
    width: '100%',
    height: 250,
    position: 'absolute',
  },
  topBlockView: {
    paddingTop: 5,
    paddingBottom: 10,
    borderBottomColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1,
  },
  fullView: {
    paddingHorizontal: 20,
  },
  blockView: {
    marginTop: 15,
    paddingVertical: 0,
    backgroundColor: BaseColor.whiteColor,
    borderBottomColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1,
  },
  blockVerifiedView: {
    paddingBottom: 20,
  },
  verified: {
    marginTop: 20,
    flexDirection: 'row',
  },
  verifiedImage: {
    width: Utils.scaleWithPixel(30),
    height: Utils.scaleWithPixel(30),
    margin: 5,
  },
  verifiedItem: {
    width: '90%',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  accreditationImage: {
    width: Utils.scaleWithPixel(30),
    height: Utils.scaleWithPixel(30),
    margin: 10,
  },
  amenityImage: {
    width: Utils.scaleWithPixel(32),
    height: Utils.scaleWithPixel(32),
    margin: 10,
    backgroundColor: Utils.BlackColor,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  reviewView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  reviewCount: {
    paddingHorizontal: 5,
  },
  reviewBlockView: {
    flexDirection: 'column',
    paddingVertical: 20,
  },
  reviewHeaderView: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  reviewTitleView: {
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  contentButtonBottom: {
    marginTop: 10,
  },
  textHeight: {
    marginTop: 10,
    lineHeight: 25,
  },
  subtitleMargin: {
    marginTop: 25,
    marginBottom: 25,
  },
  showOrReadMoreMP: {
    color: '#284F30',
    marginBottom: 15,
    paddingRight: 10,
  },
});
