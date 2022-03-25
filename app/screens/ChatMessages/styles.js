import { StyleSheet } from 'react-native';
import { BaseColor } from '@config';
import * as Utils from '@utils';

export default StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendingContainer: {
    height: '100%',
    width: 45,
    marginRight: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  systemMessageWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    padding: 5,
  },
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  logoBlockView: {
    borderBottomColor: BaseColor.fieldColor,
    borderBottomWidth: 2,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {
    width: Utils.scaleWithPixel(32),
    height: Utils.scaleWithPixel(32),
    marginHorizontal: 20,
  },

  rnderComposer: {
    color: '#222B45',
    backgroundColor: '#EDF1F7',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#E4E9F2',
    paddingTop: 8.5,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },

  rnderImg: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
  },
  rnderImgContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '98%',
    borderRadius: 15,
  },

  rnderActinContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
  },

  rnderFileContainer: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 10,
    borderColor: '#d3d3d3',
    borderWidth: 0.2,
    maxWidth: 150,
  },

  fileTitle: {
    paddingTop: 10,
    fontSize: 14,
    color: '#6646ee',
  },

  closeChatMessage: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#aaa',
    borderTopWidth: 0.5,
  },
});
