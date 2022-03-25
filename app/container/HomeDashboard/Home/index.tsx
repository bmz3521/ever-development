import React, { memo, useState, useCallback } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Colors, Routes } from "app/configs";
import Greeting from "app/patient-components/Home/Greeting";
import SearchBox from "app/elements/SearchBox";
import MainControl from "app/patient-components/Home/MainControl";
import TasksForToday from "app/patient-components/Home/TasksForToday";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { useNavigation } from "@react-navigation/native";
import IconNotification from "app/patient-components/Home/IconNotification";
import scale from "app/utils/scale";

interface HomeProps { }

const Home = memo((props: HomeProps) => {
  const [searchKey, setSearchKey] = useState("");
  const { navigate } = useNavigation();
  const onTodayTask = useCallback(() => {
    navigate(Routes.TodayTask);
  }, [navigate]);
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <IconNotification
          style={{
            position: "absolute",
            top: getStatusBarHeight() + 16,
            right: 24,
            zIndex: 10,
          }}
        />
        <Greeting />
        <SearchBox
          placeholder={"Search health issue, doctor, topic..."}
          value={searchKey}
          onChangeText={setSearchKey}
          style={{ marginTop: scale(24), marginBottom: scale(32) }}
        />
        <TasksForToday step={5} onPress={onTodayTask} />
        <MainControl />
      </ScrollView>
    </View>
  );
});

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Snow,
  },
  contentContainerStyle: {
    paddingBottom: 16,
    paddingHorizontal: 24,
    paddingTop: getStatusBarHeight() + 16,
  },
});
