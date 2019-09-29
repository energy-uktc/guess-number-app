import React from "react";
import { TouchableNativeFeedback, View, Text, StyleSheet } from "react-native";
import Colors from "../constants/color";
import DefaultStyle from "../constants/defaultStyles";

const CustomButton = props => {
  return (
    <TouchableNativeFeedback {...props}>
      <View
        style={[
          { ...styles.button, ...props.style },
          props.backgroundColor
            ? {
                backgroundColor: props.backgroundColor
              }
            : {}
        ]}
      >
        <Text
          style={[
            { ...styles.buttonText, ...DefaultStyle.bodyText },
            props.textColor ? { color: props.textColor } : {}
          ]}
        >
          {props.children}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 40
  },
  buttonText: {
    color: "white"
  }
});

export default CustomButton;
