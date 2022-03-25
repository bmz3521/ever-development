import React, {memo, useLayoutEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Text from 'app/elements/Text';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ButtonIconHeader from 'app/elements/Buttons/ButtonIconHeader';
import Theme from 'app/style/Theme';
import {Colors, Routes} from 'app/configs';
import ButtonLinear from 'app/elements/Buttons/ButtonLinear';
import keyExtractor from 'app/utils/keyExtractor';
import QuestionAnswerItem from 'app/patient-components/QuestionAnswerItem';
import {MY_QUESTION} from 'app/configs/Data';
// import {useTheme} from 'app/configs/ChangeTheme'
import Container from 'app/elements/Layout/Container';
import Layout from 'app/elements/Layout/Layout';

export default memo(() => {
  const {setOptions, navigate} = useNavigation();
  const [myQuestion, setMyQuestion] = React.useState<any>([]);

  useFocusEffect(
    React.useCallback(() => {
      setMyQuestion(MY_QUESTION);
    }, []),
  );

  const handlePressSearch = React.useCallback(() => {}, []);

  const handlePressAdd = React.useCallback(() => {}, []);
  // const {theme} = useTheme();
 
  const handlePressItem = React.useCallback((item: any) => {
    navigate(Routes.MyQuestionDetail, item);
  }, []);

  const listHeaderComponent = React.useCallback(() => {
    return (
      <Layout style={styles.box}>
        <Text center bold size={17} lineHeight={22}>
          Have a health question?
        </Text>
        <ButtonLinear white  style={styles.button} title={'Ask a free now!'} />
      </Layout>
    );
  }, []);

  const renderItem = React.useCallback(({item}) => {
    return (
      <QuestionAnswerItem
        onPress={() => handlePressItem(item)}
        style={styles.item}
        {...item}
      />
    );
  }, []);

  return (
    <Container style={styles.container}>
      <Text
        marginLeft={24}
        marginTop={24}
        bold
        size={24}
        lineHeight={28}
        marginBottom={8}>
        My Questions
      </Text>
      <FlatList
        data={myQuestion}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        keyExtractor={keyExtractor}
        ListHeaderComponent={listHeaderComponent}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    paddingVertical: 32,
    marginHorizontal: 24,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    shadowOpacity: 1,
    shadowColor: Colors.boxShadow,
    borderRadius: 16,
  },
  button: {
    marginHorizontal: 76,
    marginTop: 24,
  },
  contentContainerStyle: {
    paddingTop: 32,
  },
  item: {
    marginHorizontal: 24,
    marginTop: 16,
  },
});
