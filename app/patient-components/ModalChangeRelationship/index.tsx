import React, { memo, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Text from "app/elements/Text";
import TextInput from "app/elements/TextInput";
import scale from "app/utils/scale";
import Theme from "app/style/Theme";
import { Colors } from "app/configs";
import { categoryList } from "app/type/category";
import { RELATIONSHIP } from "app/configs/Data";

interface ModalChangeRelationshipProps{
  onChangeRelationship: (item: categoryList) => void;
}

const ModalChangeRelationship = memo((props: ModalChangeRelationshipProps) => {
  const [keyword, setKeyword] = useState("");
  const renderItem = useCallback(
    ({ item }) => {
      const onPress = () => {
        props.onChangeRelationship && props.onChangeRelationship(item);
      };
      return (
        <TouchableOpacity style={styles.item} onPress={onPress}>
          <Text size={15} lineHeight={24} color={Colors.DarkJungleGreen}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    },
    [props.onChangeRelationship]
  );
  return (
    <View style={styles.container}>
      <TextInput
        iconLeft={
          <Image
            source={require("app/images/Icon/ic_search_normal.png")}
            style={styles.iconSearch}
          />
        }
        isShowIconLeft={true}
        value={keyword}
        onChangeText={setKeyword}
        backgroundColor={Colors.Isabelline}
        borderColor={Colors.Isabelline}
        placeholder={"Search"}
        editable
      />
      <FlatList
        data={RELATIONSHIP}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
});

export default ModalChangeRelationship;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 24,
    height: scale(493, true),
  },
  iconSearch: {
    width: 20,
    height: 20,
  },
  item: {
    ...Theme.flexRow,
    paddingVertical: 16,
  },
  flag: {
    width: 32,
    height: 20,
    marginRight: 16,
  },
  textCode: {
    width: 76,
  },
  contentContainerStyle: {
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
});
