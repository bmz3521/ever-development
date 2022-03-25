import React, { memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Routes } from "app/configs";
import Home from "app/container/HomeDashboard/Home";

const Stack = createStackNavigator();

const HomeStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.Home}
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
});

export default HomeStack;
