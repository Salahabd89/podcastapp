import { StatusBar } from "expo-status-bar";
import React, { Component, useEffect, useState } from "react";
import { SearchBar, Button } from "react-native-elements";
import { View, TextInput, StyleSheet, SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import addtask from "./addtask";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Podcasts from "./podcasts";

export function Tasksmain(props) {
  const styles = StyleSheet.create({
    tinyLogo: {
      width: 50,
      height: 50,
    },
    button: {
      padding: 20,
      margin: 20,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });

  const addFunction = () => {
    props.navigation.navigate("Add a Task");
  };

  return (
    <View>
      <SafeAreaView>
        <Button
          onPress={addFunction}
          style={styles.button}
          title="Create a Task"
        />
      </SafeAreaView>
    </View>
  );
}

export default function Tasks() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Tasks" component={Tasksmain} />
      <Stack.Screen name="Add a Task" component={addtask} />
      <Stack.Screen name="Add a Podcast" component={Podcasts} />
    </Stack.Navigator>
  );
}
