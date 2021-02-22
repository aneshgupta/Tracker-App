import React, { useContext } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Text, Button } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
import Spacer from "../components/Spacer";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
      <Text h3>Account Screen</Text>
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

AccountScreen.navigationOptions = {
  tabBarIcon: <MaterialCommunityIcons name="account" size={24} />,
};

export default AccountScreen;
