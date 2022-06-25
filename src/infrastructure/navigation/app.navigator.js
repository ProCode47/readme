import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import { Text, View, Button } from "react-native";
import { SafeArea } from "../../utility/safe-area";
import HomeScreen from "../../features/home/screens/home.screen";
import BookDetails from "../../features/home/screens/book-details.screen";
import Credits from "../../features/home/screens/credits.screen";
import { SearchNavigator } from "./search.navigator";

const Drawer = createDrawerNavigator();

const TAB_ICON = {
  Home: "home",
  Credits: "code",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    drawerIcon: ({ size, focused }) => (
      <Feather name={iconName} size={size} color={focused ? "#7cc" : "#ccc"} />
    ),
    headerShown: false,
  };
};

export const AppNavigator = () => (
  <NavigationContainer>
    <Drawer.Navigator
      screenOptions={createScreenOptions}
      initialRouteName="Home"
    >
      <Drawer.Screen component={SearchNavigator} name="Home" />
      <Drawer.Screen component={Credits} name="Credits" />
    </Drawer.Navigator>
  </NavigationContainer>
);
