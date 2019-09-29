import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Color from "../constants/color";
import DefaultStyle from "../constants/defaultStyles";

const NumberContainer = props => {
  return (
    <View style={styles.container}>
      <Text style={{ ...DefaultStyle.bodyText, ...styles.text }}>
        {props.children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Color.accent,
    borderRadius: 10,
    padding: 10,
    margin: 10
  },
  text: {
    fontSize: 22,
    color: Color.accent
  }
});

export default NumberContainer;
