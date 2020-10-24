import { StatusBar } from "expo-status-bar";
import React, { Component, useState, useEffect } from "react";

import { Audio } from "expo-av";
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

const playbackInstance = new Audio.Sound();

export const Player = (props) => {
  let episode = props.route.params;

  let [duration, SetDuration] = useState(episode.item.duration);
  let [position, SetPosition] = useState(0);
  let [loaded, SetLoaded] = useState(false);
  let [audiostate, SetAudioState] = useState({
    isPlaying: true,
    playbackInstance: null,
    currentIndex: 0,
    volume: 1.0,
    isBuffering: false,
  });

  const source = {
    uri: episode.item.link,
  };

  const status = {
    shouldPlay: audiostate.isPlaying,
    volume: audiostate.volume,
  };

  useEffect(() => {
    /*await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: true,
    });*/
  }, []);

  const start = async () => {
    if (loaded == false) {
      await playbackInstance.loadAsync(source, status, true);
      SetLoaded(true);
    } else {
      await playbackInstance.playAsync();
    }
  };

  const convertToMinutes = (s, type) => {
    if (type == "duration") {
      let minutes = Math.floor(s / 60);
      let seconds = ((s % 600) / 1000).toFixed(0);
      return seconds == 60
        ? minutes + 1 + ":00"
        : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    } else if (type == "position") {
      let minutes = Math.floor(s / 60000);
      let seconds = ((s % 60000) / 1000).toFixed(0);
      return seconds == 60
        ? minutes + 1 + ":00"
        : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }
  };

  const pause = async () => {
    await playbackInstance.pauseAsync();
    let pos_of_media = await playbackInstance
      .getStatusAsync()
      .then(function (result) {
        return result.positionMillis;
      });

    SetPosition(pos_of_media);
  };

  return (
    <View>
      <Text>{episode.item.title}</Text>
      <Text>{episode.item.description}</Text>
      <Text>{episode.item.publish_date}</Text>
      <Text>{episode.item.duration}</Text>
      <Button onPress={start} title="Play"></Button>
      <Button onPress={pause} title="Pause"></Button>
      <Text>
        {"Duration: "} {convertToMinutes(episode.item.duration, "duration")}
      </Text>
      <Text>
        {"position: "} {convertToMinutes(position, "position")}
      </Text>
    </View>
  );
};
