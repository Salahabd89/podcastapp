import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import { SearchBar, Input, Text, Button } from "react-native-elements";
import { View, TextInput, StyleSheet, SafeAreaView } from "react-native";
import { Calendar } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Podcasts from "./podcasts";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Tasks(props) {
  const styles = StyleSheet.create({
    input: {
      marginTop: 30,
    },
    titleh4: {
      marginTop: 1,
    },
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDateTime, selectDT] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [task, setTask] = useState([]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    selectDT(JSON.stringify(date));
    hideDatePicker();
  };

  const addPodcasts = () => {
    console.log(props.navigation);
    props.navigation.navigate("Add a Podcast");
  };

  const addTask = async () => {
    try {
      let taskid = "task_" + taskName + "_" + selectedDateTime;

      let taskData = {
        taskid: taskid,
        taskname: taskName,
        taskdesc: taskDesc,
        datetime: selectedDateTime,
      };
      setTask(taskData);

      console.log(taskData);
      console.log(taskid);
      const task = JSON.stringify(taskData);
      await AsyncStorage.setItem(taskid, task);
    } catch (e) {
      // saving error
    }
  };

  return (
    <View>
      <SafeAreaView>
        <Text style={styles.titleh4} h4>
          Task Name
        </Text>

        <Input
          style={styles.input}
          onChangeText={(value) => setTaskName(value)}
        />

        <Text style={styles.titleh4} h4>
          Description
        </Text>

        <Input
          style={styles.input}
          onChangeText={(value) => setTaskDesc(value)}
        />
        <Text>{selectedDateTime}</Text>
        <Button title="Select Date" onPress={showDatePicker} />
        <Button title="Add Podcast" onPress={addPodcasts} />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          display="default"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </SafeAreaView>
      <Button title="Add Task" onPress={addTask} />
    </View>
  );
}
/* <Button title="Select Date"></Button>*/
