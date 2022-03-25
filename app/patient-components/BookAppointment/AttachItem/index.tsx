import React, { memo } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import Text from "app/elements/Text";
import { Colors } from "app/configs";
import { IMAGE } from "app/images/Image";
import { ICON } from "app/images/Icon";
import Theme from "app/style/Theme";

interface AttachItemProps {
  uri?: ImageSourcePropType;
  name?: string;
  time?: string;
  onClose?: () => void;
}

const AttachItem = memo(({ item , onClose }: AttachItemProps) => {
  console.log('item', item);
  return (
    <View>
      {item != null ? (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.close}
            activeOpacity={0.54}
            onPress={() => onClose(item)}
          >
            <Image
              source={ICON.close}
              style={styles.iconClose}
              tintColor={Colors.White}
            />
          </TouchableOpacity>
          <Image source={{uri: item.uri}} style={styles.image} />
          <View>
            <Text
              bold
              size={13}
              lineHeight={16}
              marginBottom={8}
              style={{ width: 150 }}
            >
              {item.name}
            </Text>
            <Text size={11} lineHeight={14} color={Colors.GrayBlue}>
              {/* Uploaded {time} */}
            </Text>
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
});

export default AttachItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Snow,
    padding: 8,
    marginBottom: 24,
    borderRadius: 8,
    ...Theme.flexRow,
  },
  image: {
    width: 100,
    height: 72,
    marginRight: 12,
    borderRadius: 4,
  },
  close: {
    position: "absolute",
    ...Theme.center,
    width: 16,
    height: 16,
    right: 4,
    top: 4,
    backgroundColor: Colors.GrayBlue,
    borderRadius: 16,
  },
  iconClose: {
    width: 10,
    height: 10,
  },
});
