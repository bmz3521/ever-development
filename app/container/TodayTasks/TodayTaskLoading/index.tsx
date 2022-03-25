import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "app/configs";
import Theme from "app/style/Theme";
import scale from "app/utils/scale";
import TodayTasksItemLoading from "app/patient-components/TodayTasks/TodayTaskItemLoading";

const TodayTasksLoading = memo(() => {
  return (
    <View style={styles.container}>
      <TodayTasksItemLoading />
      <TodayTasksItemLoading />
      <TodayTasksItemLoading />
      <TodayTasksItemLoading />
      <TodayTasksItemLoading />
      <TodayTasksItemLoading />
    </View>
  );
});
export default TodayTasksLoading;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Snow,
    marginTop: scale(24),
  },
  buttonChildren: {
    ...Theme.icons,
    marginLeft: scale(8),
  },
  buttonLinear: {
    marginTop: scale(68),
  },
});
