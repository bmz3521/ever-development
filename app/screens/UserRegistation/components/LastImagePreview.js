import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { ImageViewerModal } from '@components';
import { Icon } from 'react-native-elements';
import useStyles from '../styles';

const LastImagePreview = ({
  photoImage,
  title,
  subtitle,
  description,
  containerStyles,
  editHandler,
}) => {
  const baseStyles = useStyles();
  return (
    <View style={{ paddingHorizontal: 20, ...containerStyles }}>
      <Text
        style={[
          baseStyles.textDefault,
          {
            fontSize: 16,
            color: baseStyles.placeholderColor,
          },
        ]}
      >
        {title}
      </Text>
      <ImageViewerModal title={subtitle} images={photoImage}>
        <View style={baseStyles.previewImageContainer}>
          <View style={{ flex: 3, paddingHorizontal: 15, paddingTop: 15 }}>
            <Text
              style={[
                baseStyles.titleDefault,
                {
                  fontSize: 16,
                  color: baseStyles.primaryColor,
                  marginBottom: 5,
                },
              ]}
            >
              {subtitle}
            </Text>
            <Text
              style={[
                baseStyles.textDefault,
                { fontSize: 14, color: '#656565' },
              ]}
            >
              {description}
            </Text>
          </View>
          <Image
            style={{
              flex: 1.5,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
            }}
            source={{ uri: photoImage }}
          />
          <TouchableOpacity
            onPress={editHandler}
            activeOpacity={0.9}
            style={{
              position: 'absolute',
              bottom: -10,
              right: -8,
              padding: 5,
              backgroundColor: 'white',
              borderRadius: 30,
              borderWidth: 1,
              borderColor: '#999',
            }}
          >
            <Icon name="edit" size={20} color={'#999'} />
          </TouchableOpacity>
        </View>
      </ImageViewerModal>
    </View>
  );
};

export default LastImagePreview;
