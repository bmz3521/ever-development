import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Icon } from '@components';
import useStyles from './styles';

const ImageViewerModal = ({
  onLongPress,
  images,
  children,
  imageList = [],
  isList,
  title,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const styles = useStyles();
  const index = useMemo(() => {
    if (isList) {
      return imageList.findIndex(ele => ele?.url === images);
    } else {
      return 0;
    }
  }, [images]);

  const renderIndicator = useCallback((index, size) => {
    return isList || title ? (
      <View style={styles.indicatorContainer}>
        <Text style={styles.textIndicator}>
          {title ? `${title}` : `${index}/${size}`}
        </Text>
      </View>
    ) : (
      <View></View>
    );
  }, []);

  const renderCloseButton = () => {
    return (
      <TouchableOpacity
        onPress={() => setModalVisible(prev => !prev)}
        style={styles.closeBtn}
      >
        <Icon name="times" style={styles.closeIcon} />
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Modal visible={modalVisible} transparent={true}>
        <ImageViewer
          index={index}
          imageUrls={isList ? imageList : [{ url: images }]}
          renderIndicator={renderIndicator}
          enableImageZoom={true}
          loadingRender={() => <ActivityIndicator size="large" />}
          // onSwipeDown={() => setModalVisible(!modalVisible)}
          enableSwipeDown={false}
          useNativeDriver={true}
          renderHeader={renderCloseButton}
        />
      </Modal>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => setModalVisible(prev => !prev)}
        onLongPress={onLongPress}
      >
        {children}
      </TouchableOpacity>
    </View>
  );
};
export default ImageViewerModal;
