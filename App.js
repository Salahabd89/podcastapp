import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer } from "react-navigation";
import Tasks from "./screens/tasks";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Episodes } from "./screens/episodes";
import { Player } from "./screens/player";
import Podcasts from "./screens/podcasts";

export function NavTabs() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Tasks" component={Tasks} />
      <Tab.Screen name="Podcasts" component={Podcasts} />
    </Tab.Navigator>
  );
}

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <NavTabs></NavTabs>
    </NavigationContainer>
  );
}
