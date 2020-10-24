import { StatusBar } from "expo-status-bar";
import React, { Component, useState, useEffect } from "react";
import { Listepisodes } from "../components/listepisodes";
import { DOMParser } from "xmldom";

import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Image, Card, Text } from "react-native-elements";

export const Episodes = (props) => {
  const [episodes, epList] = useState([]);
  const [showData, setData] = useState([
    {
      title: "",
      link: "",
      summary: "",
      author: "",
      genre: [],
      image: "",
    },
  ]);
  let episodeList = [];

  const getPodDetails = async () => {
    let feed = props.route.params;
    const result = await fetch(feed);
    const text = await result.text();

    const podcastDocument = new DOMParser().parseFromString(text, "text/xml");

    renderShowData(podcastDocument);

    const items = podcastDocument.getElementsByTagName("item");
    Array.prototype.slice.call(items, 1, 50).map(renderPodcastTrack);
  };

  const renderShowData = (podcastDocument) => {
    let genrelist = [];

    let title = podcastDocument
      .getElementsByTagName("channel")[0]
      .getElementsByTagName("title")[0].firstChild.nodeValue;

    let link = podcastDocument
      .getElementsByTagName("channel")[0]
      .getElementsByTagName("link")[0].firstChild.nodeValue;

    let summary = podcastDocument
      .getElementsByTagName("channel")[0]
      .getElementsByTagName("itunes:summary")[0].firstChild.nodeValue;

    let author = podcastDocument
      .getElementsByTagName("channel")[0]
      .getElementsByTagName("itunes:author")[0].firstChild.nodeValue;

    let genre = Array.from(
      podcastDocument
        .getElementsByTagName("channel")[0]
        .getElementsByTagName("itunes:category")
    );

    let image = podcastDocument
      .getElementsByTagName("channel")[0]
      .getElementsByTagName("image")[0]
      .getElementsByTagName("url")[0].firstChild.nodeValue;

    genre.map((element) => {
      genrelist.push(element.attributes[0].nodeValue);
    });

    setData({
      title: title,
      link: link,
      summary: summary,
      author: author,
      genre: genrelist,
      image: image,
    });
    console.log({ title, link, summary, author, genrelist, image });
  };

  const renderPodcastTrack = (track, i) => {
    episodeList.push({
      link: track.getElementsByTagName("enclosure")[0].getAttribute("url"),
      title: track.getElementsByTagName("title")[0].firstChild.nodeValue,
      publish_date: track.getElementsByTagName("pubDate")[0].firstChild
        .nodeValue,
      duration: track.getElementsByTagName("itunes:duration")[0].firstChild
        .nodeValue,
      description: track.getElementsByTagName("description")[0].firstChild
        .nodeValue,
      index: i,
    });

    epList(episodeList);
  };

  useEffect(() => {
    getPodDetails();
  }, []);

  return (
    <View
      style={{
        flexDirection: "column",
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <Card>
        <Image
          source={{ uri: showData.image }}
          style={{ width: 200, height: 200 }}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text>{showData.title}</Text>
        <Text>{showData.author}</Text>
        <Text>{showData.summary}</Text>
        <Text>{console.log(showData.genre)}</Text>
      </Card>
      <Listepisodes episodes={episodes} navigation={props.navigation} />
    </View>
  );
};
