import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Text, Input, Button } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, signin, clearErrorMsg } = useContext(AuthContext);

  return (
    <View style={styles.viewStyle}>
      <NavigationEvents onWillFocus={clearErrorMsg} />
      <Text h3 style={styles.headerStyle}>
        Sign In to your Account
      </Text>
      <Input
        value={email}
        label="Email"
        onChangeText={(term) => setEmail(term)}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        value={password}
        label="Password"
        onChangeText={(term) => setPassword(term)}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      {state.errorMsg ? (
        <Text style={styles.errorStyle}>{state.errorMsg}</Text>
      ) : null}
      <Button
        title="Sign In"
        onPress={() => {
          signin({ email, password });
        }}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>
          Don't have an account? Go back to sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    marginBottom: 200,
  },
  headerStyle: {
    margin: 15,
  },
  errorStyle: {
    fontSize: 16,
    color: "red",
    marginBottom: 10,
  },
  link: {
    color: "blue",
    margin: 10,
  },
});

SigninScreen.navigationOptions = {
  headerShown: false,
};

export default SigninScreen;
