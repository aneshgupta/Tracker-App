import React, { useContext } from "react";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";
import { Context as LocationContext } from "../context/LocationContext";
import Spacer from "../components/Spacer";
import useSaveTrack from "../hooks/useSaveTrack";

const TrackForm = () => {
  const {
    state: { name, recording, locations },
    startRecording,
    stopRecording,
    changeName,
  } = useContext(LocationContext);
  const [saveTrack] = useSaveTrack();

  return (
    <View style={{ margin: 15 }}>
      <Input
        value={name}
        placeholder="Enter track name"
        onChangeText={changeName}
      />
      {recording ? (
        <Button title="Stop" onPress={stopRecording} />
      ) : (
        <Button title="Start Recording" onPress={startRecording} />
      )}
      <Spacer />
      {!recording && locations.length ? (
        <Button title="Save" onPress={saveTrack} />
      ) : null}
    </View>
  );
};

export default TrackForm;
