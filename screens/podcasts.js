import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import { SearchBar, ListItem, Icon, Avatar } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createAppContainer } from "react-navigation";
import { Episodes } from "./episodes";
import { Player } from "./player";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";

export function PodcastsMain(props) {
  const [podcasts, podResults] = useState([]);
  const [terms, searchResults] = useState("");
  const styles = StyleSheet.create({
    tinyLogo: {
      width: 50,
      height: 50,
    },
    button: {
      padding: 10,
      margin: 10,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });

  async function onPressSearch() {
    const uri = `https://itunes.apple.com/search?media=podcast&term=${terms}`;

    const result = await fetch(uri);
    const json = await result.json();

    podResults(json.results);
  }

  const resultClick = async (feedUrl) => {
    props.navigation.navigate("Episodes", feedUrl, props.navigation);
  };

  function renderPodcastList() {
    if (podcasts === undefined) {
      return null;
    }

    return podcasts.map((item, i) => (
      <ListItem
        onPress={() => resultClick(item.feedUrl, props.navigation)}
        key={i}
        bottomDivider
      >
        <Avatar source={{ uri: item.artworkUrl100 }} />
        <ListItem.Content>
          <ListItem.Title>{item.collectionName}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    ));
  }

  async function onChangeInput(text) {
    searchResults(text);
  }

  return (
    <View>
      <TextInput
        style={{
          width: "100%",
          borderColor: "#e0e0e0",
          borderWidth: 1,
          borderRadius: 4,
          padding: 10,
        }}
        onChange={onChangeInput}
      />
      <SearchBar
        placeholder="Type Here..."
        onSubmitEditing={onPressSearch}
        onChangeText={onChangeInput}
        value={terms}
      />
      {renderPodcastList()}
    </View>
  );
}

export default function Podcasts() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Podcasts" component={PodcastsMain} />
      <Stack.Screen name="Episodes" component={Episodes} />
      <Stack.Screen name="Player" component={Player} />
    </Stack.Navigator>
  );
}
