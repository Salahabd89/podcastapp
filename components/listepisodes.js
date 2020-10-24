import { StatusBar } from "expo-status-bar";
import React, { Component, useState, useEffect } from "react";
import { SearchBar, ListItem, Icon, Avatar } from 'react-native-elements';
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
  ScrollView,
} from "react-native";

export const Listepisodes = (props) => {
  function Item(item) {
    return (
      <ListItem onPress={() => resultClick(item)} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.item.title}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  }

  const resultClick = async (episode) => {
    props.navigation.navigate("Player", episode);
  };

  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={props.episodes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        extraData={props}
        removeClippedSubviews={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 1,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
