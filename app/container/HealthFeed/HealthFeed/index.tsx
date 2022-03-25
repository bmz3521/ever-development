import React, { memo, useCallback, useLayoutEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ButtonIconHeader from "app/elements/Buttons/ButtonIconHeader";
import { Colors } from "app/configs";
import ScrollableTab from "app/elements/ScrollableTab";
import Text from "app/elements/Text";
import FollowingQuestions from "app/patient-components/HealthFeed/FollowingQuestions";
import FollowingTopics from "app/patient-components/HealthFeed/FollowingTopics";
import Theme from "app/style/Theme";
import changeAlias from "app/utils/stringAlias";
import SearchBox from "app/elements/SearchBox";
import ButtonText from "app/elements/Buttons/ButtonText";
import keyExtractor from "app/utils/keyExtractor";
import { FOLLOWING_TOPIC } from "app/configs/Data";

export default memo(() => {
  const { setOptions } = useNavigation();
  const [indexPage, setIndexPage] = useState<any>(0);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [dataSearch, setDataSearch] = React.useState<any>([]);
  const [searchKey, setSearchKey] = useState<string>("");

  const onSearchChange = React.useCallback(
    (text: string) => {
      setSearchKey(text);
      if (text === "" || text === null || text === undefined) {
        setDataSearch([]);
      } else {
        let data = [];
        for (let i = 0; i < FOLLOWING_TOPIC.length; i++) {
          if (
            changeAlias(FOLLOWING_TOPIC[i].topicName).includes(
              changeAlias(text)
            )
          ) {
            data.push(FOLLOWING_TOPIC[i]);
          }
        }
        setDataSearch(data);
      }
    },
    [dataSearch]
  );

  const onSearch = () => {
    setIsSearch(!isSearch);
  };

  const onCancel = () => {
    setIsSearch(!isSearch);
    setSearchKey("");
    setDataSearch([]);
  };

  const renderItem = useCallback(({ item }) => {
    return (
      <TouchableOpacity style={{ marginBottom: 24 }}>
        <Text size={15} lineHeight={18} bold>
          {item.topicName != undefined && item.topicName != null
            ? item.topicName
            : item.question}
        </Text>
      </TouchableOpacity>
    );
  }, []);

  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        shadowColor: "transparent",
        shadowRadius: 0,
        shadowOffset: { height: 0 },
        backgroundColor: Colors.Snow,
        elevation: 0,
      },
      headerLeft: () => (
        <>
          {isSearch ? (
            <SearchBox
              placeholder={"Search topic, question..."}
              value={searchKey}
              onChangeText={onSearchChange}
              style={styles.searchText}
              borderColor={Colors.DodgerBlue}
              autoFocus={true}
            />
          ) : (
            <ButtonIconHeader marginLeft={24} />
          )}
        </>
      ),
      headerRight: () => (
        <>
          {isSearch ? (
            <ButtonText
              title="Cancel"
              onPress={onCancel}
              style={styles.cancel}
            />
          ) : (
            <View style={Theme.flexRow}>
              <ButtonIconHeader
                icon="search"
                marginRight={24}
                tintColor={Colors.DodgerBlue}
                borderColor={Colors.DodgerBlue}
                onPress={onSearch}
              />
              {indexPage === 1 ? (
                <ButtonIconHeader
                  icon="plus"
                  marginRight={24}
                  tintColor={Colors.DodgerBlue}
                  borderColor={Colors.DodgerBlue}
                />
              ) : (
                <View />
              )}
            </View>
          )}
        </>
      ),
    });
  }, [setOptions, indexPage, isSearch, searchKey]);

  const getIndex = useCallback(
    (index) => {
      setIndexPage(index);
    },
    [indexPage]
  );

  return (
    <View style={styles.container}>
      {isSearch ? (
        <FlatList
          data={dataSearch}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.list}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <ScrollableTab
          scrollDisable={true}
          getIndex={getIndex}
          titles={["Following Topics", "Following Questions"]}
        >
          <FollowingTopics />
          <FollowingQuestions />
        </ScrollableTab>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Snow,
  },
  header: {
    paddingRight: 88,
    paddingLeft: 24,
    ...Theme.flexRowSpace,
  },
  cancel: {
    borderWidth: 0,
    marginRight: 24,
    padding: 10,
  },
  searchText: {
    minWidth: 264,
    marginLeft: 24,
  },
  list: {
    padding: 24,
  },
});
