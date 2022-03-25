import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ButtonIconHeader from "app/elements/Buttons/ButtonIconHeader";
import { Colors } from "app/configs";
import { ICON } from "app/images/Icon";
import React, { memo, useCallback, useLayoutEffect, useState } from "react";
import { FlatList, View, StyleSheet, Modal } from "react-native";
import Text from "app/elements/Text";
import FilesItem from "app/patient-components/FilesItem";
import keyExtractor from "app/utils/keyExtractor";
import { height } from "app/configs/Const";
import useModalWithKeyboard from "app/hooks/useModalWithKeyboard";
import ModalSelect from "app/patient-components/ModalSelect";
import ModalAddNewFile from "app/patient-components/ModalAddNewFile";
import { IMAGE } from "app/images/Image";
import { FILE_EXAMPLES } from "app/configs/Data";


const menuOptions = [
  {
    id: 0,
    name: "Take a Photo",
  },
  {
    id: 1,
    name: "Take a Video",
  },
  {
    id: 2,
    name: "From Doctor Plus Library",
  },
  {
    id: 3,
    name: "From Photos",
  },
];

export default memo(() => {
  const { setOptions, navigate } = useNavigation();
  const [files, setFiles] = useState<any>([]);

  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        shadowColor: "transparent",
        shadowRadius: 0,
        shadowOffset: { height: 0 },
        elevation: 0,
        backgroundColor: Colors.Snow,
      },
      headerLeft: () => <ButtonIconHeader marginLeft={24} />,
      headerRight: () => (
        <ButtonIconHeader
          icon={ICON.plus}
          tintColor={Colors.DodgerBlue}
          borderColor={Colors.DodgerBlue}
          marginRight={24}
          onPress={openAddNewOption}
        />
      ),
    });
  }, [setOptions]);

  useFocusEffect(
    useCallback(() => {
      setFiles(FILE_EXAMPLES);
    }, [])
  );
  const {
    visible: visibleMenuOption,
    open: openAddNewOption,
    close: closeAddNewOption,
    translateY: translateYMenuOption,
  } = useModalWithKeyboard(false);

  const {
    visible: visibleAddNote,
    open: openAddNote,
    close: closeAddNote,
    translateY: translateYAddNote,
  } = useModalWithKeyboard(false);

  const handleSelectMenuOption = React.useCallback(() => {
    closeAddNewOption();
  }, [closeAddNewOption]);

  const renderFiles = useCallback(({ item }) => {
    return <FilesItem onEdit={openAddNote} {...item} />;
  }, []);

  return (
    <View style={styles.container}>
      <Text size={24} bold marginHorizontal={24} marginTop={24}>
        Files
      </Text>
      <FlatList
        data={files}
        renderItem={renderFiles}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      />
      <Modal
        visible={visibleMenuOption}
        onRequestClose={closeAddNewOption}
        transparent
        animationType={"fade"}
      >
        <ModalSelect
          onPressItem={handleSelectMenuOption}
          choices={menuOptions}
          close={closeAddNewOption}
        />
      </Modal>
      <Modal
        visible={visibleAddNote}
        onRequestClose={closeAddNote}
        transparent
        animationType={"slide"}
      >
        <ModalAddNewFile close={closeAddNote} translateY={translateYAddNote} />
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Snow,
    height: height,
  },
  list: {
    paddingTop: 40,
    paddingBottom: 40,
  },
});
