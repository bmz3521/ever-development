import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { ListData, styles } from './styles';
import { SafeAreaView, ModalUI } from '@components';
import { useTheme, Icon, Button } from 'react-native-elements';
import i18next from 'i18next';

const ListingData = props => {
  const { navigation, route } = props;
  const paramPage = route.params;
  const { callBack, data, title, selected, multiple } = paramPage;
  const [listData, setListData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setListData(data);
  }, []);

  const onPresshandler = item => {
    if (multiple) {
      const selectedIndex = listData.findIndex(ele => ele === item);
      if (selectedIndex != -1) {
        const resvData = [...listData];
        resvData[selectedIndex].check = !resvData[selectedIndex]?.check;
        setListData(resvData);
      }
    } else {
      callBack(item.value);
      navigation.goBack();
    }
  };

  const onSubmitHandler = () => {
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View>
          <Text style={styles(theme).titleText}>
            {title ? title : i18next.t('LISTDATA_EMPTY_HEADER')}
          </Text>
        </View>
        <TouchableOpacity
          style={styles(theme).backIcon}
          onPress={() => navigation.goBack()}
        >
          <View>
            <Icon name="chevron-left" color={theme.colors.grey3} size={30} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, padding: 10 }}>
        {Array.isArray(data) && data.length ? (
          <>
            <ScrollView
              bounces={false}
              style={{ flexGrow: 1 }}
              contentContainerStyle={{ paddingBottom: 30 }}
            >
              {listData &&
                listData.map((item, index) => (
                  <ListData key={index}>
                    <TouchableOpacity
                      disabled={item.disable ? item.disable : false}
                      onPress={() => onPresshandler(item)}
                    >
                      {selected ? (
                        <View style={{ flexDirection: 'row' }}>
                          <Text
                            style={{
                              ...styles(theme).contentText,
                              flex: 1,
                              color: item.disable ? 'gray' : 'black',
                            }}
                          >
                            {item.label}
                          </Text>
                          {item.check ? (
                            <Icon
                              name="check"
                              size={24}
                              color={theme.colors.secondary}
                            />
                          ) : null}
                        </View>
                      ) : (
                        <Text style={styles(theme).contentText}>
                          {item.label}
                        </Text>
                      )}
                    </TouchableOpacity>
                  </ListData>
                ))}
            </ScrollView>
            {multiple && (
              <Button
                disabled={!listData.some(item => !!item.check)}
                onPress={onSubmitHandler}
                title={i18next.t('CONFIRM_BUTTON')}
                style={{ marginBottom: 20 }}
                buttonStyle={{
                  backgroundColor: theme.colors.primary,
                  borderRadius: 15,
                }}
                titleStyle={{
                  fontFamily: theme.fontFamilyBold,
                  fontSize: theme.fontSizeDefault,
                  paddingVertical: 5,
                }}
              />
            )}
          </>
        ) : (
          <View style={styles(theme).emptyContainer}>
            <Text style={styles(theme).emptyText}>
              {i18next.t('LISTDATA_EMPTY_TEXT')}
            </Text>
          </View>
        )}
      </View>
      <ModalUI onCustomUI onOpenModal={isModalVisible}>
        <Text style={styles(theme).modalTitle}>
          {i18next.t('PROFILE_EDIT_SAVE_TITLE')}
        </Text>
        <TouchableOpacity
          style={[
            styles(theme).modalButtonContainer,
            {
              marginTop: 20,
              backgroundColor: theme.colors.primary,
            },
          ]}
          onPress={() => {
            setIsModalVisible(false);
            const finalList = listData.filter(item => !!item.check);
            const mapResult = finalList.map(ele => ele.value);
            callBack(mapResult);
            navigation.goBack();
          }}
        >
          <Text style={styles(theme).buttonTextAdd}>
            {i18next.t('CONFIRM_BUTTON')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles(theme).modalButtonContainer,
            {
              marginVertical: 10,
              backgroundColor: theme.colors.greyOutline,
            },
          ]}
          onPress={() => setIsModalVisible(false)}
        >
          <Text style={styles(theme).buttonTextAdd}>
            {i18next.t('CANCEL_BUTTON')}
          </Text>
        </TouchableOpacity>
      </ModalUI>
    </SafeAreaView>
  );
};

export default ListingData;
